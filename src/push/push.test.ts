import assert from 'node:assert/strict';
import test from 'node:test';

import { registerToken, runPushAction } from './action.ts';
import { recipients, upsertToken, type PushTokenRecord } from './audience.ts';
import { addInboxNote } from './inbox.ts';
import { shouldOfferPush } from './offer.ts';
import { chunkMessages, reviewSend, tokensFromReceiptErrors, type PushMessage, type PushStore } from './send.ts';
import { staffPage } from './staffPage.ts';

const secret = 'staff-secret-ok';

function token(id: string, topics: PushTokenRecord['topics']): PushTokenRecord {
  return { token: `ExponentPushToken[${id}]`, topics, updatedAt: '2026-10-19T00:00:00.000Z' };
}

function fields(overrides: Partial<Parameters<typeof runPushAction>[0]> = {}) {
  return {
    secret,
    title: 'September 2026 update',
    body: 'The September newsletter is ready to read.',
    topic: 'news',
    mode: 'send',
    confirmed: true,
    testToken: '',
    ...overrides,
  };
}

test('the offer waits until someone opens a page', () => {
  assert.equal(shouldOfferPush('/', true, false), false);
  assert.equal(shouldOfferPush('/programs', false, false), false);
  assert.equal(shouldOfferPush('/programs', true, false), true);
  assert.equal(shouldOfferPush('/programs', true, true), false);
  assert.equal(shouldOfferPush('/more/notifications', true, false), false);
});

test('tokens store topics only and skip people who turned everything off', () => {
  const store: PushStore = { tokens: [], lastBroadcastAt: null };
  const saved = registerToken(store, 'ExponentPushToken[abc]', ['news', 'secret-name'], '2026-10-19T00:00:00.000Z');
  assert.deepEqual(saved && Object.keys(saved).sort(), ['token', 'topics', 'updatedAt']);
  assert.deepEqual(saved?.topics, ['news']);
  const records = upsertToken(store.tokens, 'ExponentPushToken[off]', [], '2026-10-19T00:00:00.000Z');
  assert.deepEqual(recipients(records, 'all').map((item) => item.token), ['ExponentPushToken[abc]']);
  assert.deepEqual(recipients(records, 'housing'), []);
});

test('a broadcast needs a confirm step, a real password, and a cooldown', () => {
  const base = {
    secret,
    expectedSecret: secret,
    confirmed: false,
    testOnly: false,
    preview: false,
    lastBroadcastAt: null,
    now: 1_000,
  };
  assert.equal(reviewSend(base).ok, false);
  assert.equal(reviewSend({ ...base, confirmed: true, expectedSecret: 'your_staff_secret' }).ok, false);
  assert.equal(reviewSend({ ...base, secret: 'nope', confirmed: true }).ok, false);
  const allowed = reviewSend({ ...base, confirmed: true });
  assert.equal(allowed.ok, true);
  const cooled = reviewSend({ ...base, confirmed: true, lastBroadcastAt: 1_000, now: 1_000 + 60_000 });
  assert.equal(cooled.ok, false);
});

test('sends are batched and a dead phone token is removed', async () => {
  const records = Array.from({ length: 101 }, (_, index) => token(String(index), ['news']));
  const store: PushStore = { tokens: records, lastBroadcastAt: null };
  const urls: string[] = [];
  const result = await runPushAction(fields(), store, 5_000, async (input) => {
    const url = String(input);
    urls.push(url);
    if (url.includes('getReceipts')) {
      return Response.json({
        data: { 'ticket-0': { status: 'error', details: { error: 'DeviceNotRegistered' } } },
      });
    }
    const batch = JSON.parse(new Request(input).method ? '[]' : '[]');
    void batch;
    const count = url.includes('push/send') ? 1 : 0;
    void count;
    return Response.json({
      data: [{ status: 'ok', id: 'ticket-0' }],
    });
  }, secret);
  assert.equal(result.ok, true);
  assert.equal(urls.filter((url) => url.includes('/push/send')).length, 2);
  assert.equal(store.tokens.some((item) => item.token === 'ExponentPushToken[0]'), false);
  assert.equal(store.lastBroadcastAt, 5_000);
});

test('preview and a wrong password do not send', async () => {
  let called = false;
  const store: PushStore = { tokens: [token('1', ['news'])], lastBroadcastAt: null };
  const fetchImpl: typeof fetch = async () => {
    called = true;
    return Response.json({ data: [] });
  };
  const preview = await runPushAction(fields({ mode: 'preview', confirmed: false }), store, 5_000, fetchImpl, secret);
  assert.equal(preview.ok, true);
  const denied = await runPushAction(fields({ secret: 'wrong-password' }), store, 5_000, fetchImpl, secret);
  assert.equal(denied.ok, false);
  if (!denied.ok) {
    assert.equal(denied.status, 401);
  }
  assert.equal(called, false);
});

test('a test send goes to one token and does not start the cooldown', async () => {
  const store: PushStore = { tokens: [token('1', ['news'])], lastBroadcastAt: null };
  const bodies: string[] = [];
  const result = await runPushAction(
    fields({ mode: 'test', confirmed: false, testToken: 'ExponentPushToken[mine]' }),
    store,
    9_000,
    async (_url, init) => {
      bodies.push(String(init?.body ?? ''));
      return Response.json({ data: [{ status: 'ok', id: 'ticket-test' }] });
    },
    secret,
  );
  assert.equal(result.ok, true);
  assert.match(bodies[0] ?? '', /ExponentPushToken\[mine\]/);
  assert.equal(store.lastBroadcastAt, null);
});

test('messages chunk at 100 and receipt errors map back to tokens', () => {
  const messages: PushMessage[] = Array.from({ length: 100 }, (_, index) => ({
    to: `ExponentPushToken[${index}]`,
    title: 'Title',
    body: 'Body',
    data: { href: '/more/newsletter', topic: 'news' },
  }));
  assert.equal(chunkMessages(messages).length, 1);
  assert.equal(chunkMessages([...messages, messages[0]!]).length, 2);
  const removed = tokensFromReceiptErrors(
    [messages[0]!],
    [{ status: 'ok', id: 'ticket-9' }],
    { 'ticket-9': { status: 'error', details: { error: 'DeviceNotRegistered' } } },
  );
  assert.deepEqual(removed, ['ExponentPushToken[0]']);
});

test('the inbox keeps the newest copy of a note and the staff page can preview it', () => {
  const first = addInboxNote([], {
    id: '1',
    title: 'September 2026 update',
    body: 'The September newsletter is ready to read.',
    href: '/more/newsletter',
    receivedAt: '2026-10-19T00:00:00.000Z',
  });
  const next = addInboxNote(first, { ...first[0]!, body: 'Updated line' });
  assert.equal(next.length, 1);
  assert.equal(next[0]?.body, 'Updated line');
  const page = staffPage({
    previewTitle: 'September 2026 update',
    previewBody: 'The September newsletter is ready to read.',
    previewTopic: 'news',
  });
  assert.match(page, /Preview/);
  assert.match(page, /I mean to send this now/);
  assert.match(page, /Send a test to that phone/);
  assert.doesNotMatch(page, /<script>/);
});
