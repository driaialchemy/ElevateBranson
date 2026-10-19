import assert from 'node:assert/strict';
import test from 'node:test';

import { freshnessNote, isStale } from './freshness.ts';

const now = new Date('2026-10-17T16:00:00.000Z');

test('a check older than 90 days asks for a phone call', () => {
  assert.equal(isStale('2026-07-18', now), true);
  assert.equal(isStale('2026-07-19', now), false);
  assert.equal(freshnessNote('2026-07-18', now), 'Last updated 2026-07-18. Call to confirm.');
  assert.equal(freshnessNote('2026-10-17', now), 'Last updated 2026-10-17');
  assert.equal(freshnessNote(undefined, now), '');
});
