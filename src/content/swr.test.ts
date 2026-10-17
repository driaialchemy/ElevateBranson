import assert from 'node:assert/strict';
import test from 'node:test';

import { fixtures } from './fixtures.ts';
import { settleContent } from './swr.ts';
import type { ContentBundle } from './types.ts';

const cached: ContentBundle = {
  ...fixtures,
  events: [
    {
      id: 'cached-event',
      title: 'Saved event',
      summary: 'From the phone',
      startsOn: '2026-12-01',
      location: 'Campus',
      sourceUrl: 'https://elevatebranson.org/',
      verify: true,
    },
  ],
};

test('a fresh download replaces the saved copy', () => {
  const remote: ContentBundle = { ...fixtures, programs: [] };
  const settled = settleContent({ cached, remote, remoteFailed: false });
  assert.equal(settled.data, remote);
  assert.equal(settled.error, null);
});

test('a failed download keeps the saved copy', () => {
  const settled = settleContent({ cached, remote: null, remoteFailed: true });
  assert.equal(settled.data.events[0]?.id, 'cached-event');
  assert.ok(settled.error);
});

test('with no saved copy and no download, the app uses starter copy', () => {
  const settled = settleContent({ cached: null, remote: null, remoteFailed: false });
  assert.equal(settled.data, fixtures);
  assert.equal(settled.error, null);
});
