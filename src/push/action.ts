import { dropTokens, isPushToken, upsertToken, type PushTokenRecord } from '@/push/audience';
import { loadExpoReceipts, sendExpoBatch } from '@/push/expoApi';
import { buildMessages, deliverBatches, reviewSend, type PushStore } from '@/push/send';
import { isTopic, routeForTopic, type Topic } from '@/push/topics';

export type PushFields = {
  secret: string;
  title: string;
  body: string;
  topic: string;
  mode: string;
  confirmed: boolean;
  testToken: string;
};

export function registerToken(store: PushStore, token: string, topics: unknown, updatedAt: string): PushTokenRecord | null {
  if (!isPushToken(token)) {
    return null;
  }
  const cleaned = Array.isArray(topics) ? topics.filter((item): item is Topic => typeof item === 'string' && isTopic(item)) : [];
  const unique = [...new Set(cleaned)];
  store.tokens = upsertToken(store.tokens, token, unique, updatedAt);
  return { token: token.trim(), topics: unique, updatedAt };
}

export async function runPushAction(
  fields: PushFields,
  store: PushStore,
  now: number,
  fetchImpl: typeof fetch = fetch,
  expectedSecret = process.env.STAFF_PUSH_SECRET,
): Promise<{ ok: true; preview?: boolean; count?: number; message: string } | { ok: false; status: number; message: string }> {
  let topic: Topic | 'all';
  if (fields.topic === 'all') {
    topic = 'all';
  } else if (isTopic(fields.topic)) {
    topic = fields.topic;
  } else {
    return { ok: false, status: 400, message: 'Choose who should receive the note.' };
  }
  const title = fields.title.trim();
  const body = fields.body.trim();
  if (title.length < 1 || title.length > 80 || body.length < 1 || body.length > 180) {
    return { ok: false, status: 400, message: 'Keep the title and message short.' };
  }

  const testOnly = fields.mode === 'test';
  const review = reviewSend({
    secret: fields.secret,
    expectedSecret,
    confirmed: fields.confirmed,
    testOnly,
    preview: fields.mode === 'preview',
    lastBroadcastAt: store.lastBroadcastAt,
    now,
  });
  if (!review.ok) {
    return review;
  }
  if (fields.mode === 'preview') {
    return { ok: true, preview: true, message: 'Read the preview, then confirm and send.' };
  }

  const href = routeForTopic(topic);
  const messages = testOnly
    ? isPushToken(fields.testToken)
      ? [{ to: fields.testToken.trim(), title, body, data: { href, topic } }]
      : []
    : buildMessages(store.tokens, { title, body, topic });

  if (testOnly && messages.length === 0) {
    return { ok: false, status: 400, message: 'Enter the token shown on your phone.' };
  }
  if (messages.length === 0) {
    return { ok: false, status: 400, message: 'No phones are signed up for that topic.' };
  }

  try {
    const result = await deliverBatches(
      messages,
      (batch) => sendExpoBatch(batch, fetchImpl),
      (ids) => loadExpoReceipts(ids, fetchImpl),
    );
    store.tokens = dropTokens(store.tokens, result.remove);
    if (!testOnly) {
      store.lastBroadcastAt = now;
    }
    return {
      ok: true,
      count: messages.length,
      message: testOnly ? 'The test note was sent to that phone.' : `Sent to ${messages.length} phones.`,
    };
  } catch {
    return { ok: false, status: 502, message: 'The note could not be sent. Try again.' };
  }
}
