import assert from 'node:assert/strict';
import test from 'node:test';

import { latestNewsletter } from './query.ts';
import { fixtures } from './fixtures.ts';
import { aboutStats } from './aboutMedia.ts';

test('the animated Learn More stat row is populated from its data list', () => {
  assert.deepEqual(aboutStats.map((stat) => stat.value), ['390+', '91.9%', '1,800+', '421', '31,200', '150+', '300+']);
});

test('newsletter ordering selects the newest issue', () => {
  assert.equal(latestNewsletter(fixtures.newsletters)?.title, 'September 2026 Newsletter');
  assert.equal(fixtures.newsletters.length >= 8, true);
});
