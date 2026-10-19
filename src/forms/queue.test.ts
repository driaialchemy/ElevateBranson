import assert from 'node:assert/strict';
import test from 'node:test';

import { fieldErrors, prayerSchema } from './schema.ts';
import { addToQueue, flushQueue, type QueuedForm } from './queue.ts';
import type { Submission } from './schema.ts';

const body = {
  type: 'tour',
  name: 'Test Neighbor',
  email: 'neighbor@example.com',
  phone: '4175550100',
  preferred: 'Friday morning',
  groupSize: '4',
  company: '',
} as Submission;

function item(id: string): QueuedForm {
  return { id, body, createdAt: '2026-10-19T00:00:00.000Z' };
}

test('offline requests stay queued until a send succeeds', async () => {
  const queued = addToQueue([], item('one'));
  const paused = await flushQueue(queued, async () => ({ kind: 'retry' }));
  assert.equal(paused.sent, 0);
  assert.equal(paused.queue.length, 1);

  const sent = await flushQueue(paused.queue, async () => ({ kind: 'sent' }));
  assert.equal(sent.sent, 1);
  assert.equal(sent.queue.length, 0);
});

test('a failed send stops the rest of the queue', async () => {
  const queued = [item('one'), item('two')];
  const result = await flushQueue(queued, async () => ({ kind: 'retry' }));
  assert.deepEqual(
    result.queue.map((entry) => entry.id),
    ['one', 'two'],
  );
});

test('prayer sharing defaults to off', () => {
  const parsed = prayerSchema.safeParse({
    type: 'prayer',
    request: 'Please pray for steady work.',
    name: '',
    contact: '',
  });
  assert.equal(parsed.success, true);
  if (parsed.success) {
    assert.equal(parsed.data.sharePublicly, false);
  }
  const invalid = prayerSchema.safeParse({ type: 'prayer', request: '', name: '', contact: '' });
  assert.equal(invalid.success, false);
  if (!invalid.success) {
    assert.equal(fieldErrors(invalid.error).request, 'Enter your prayer request.');
  }
});
