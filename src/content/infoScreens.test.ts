import assert from 'node:assert/strict';
import test from 'node:test';

import { fixtures } from './fixtures.ts';
import { comingSoon, hoursCards } from './infoScreens.ts';
import { newestUpdates } from './query.ts';

test('an empty section renders a coming soon line with the main phone', () => {
  assert.equal(comingSoon(fixtures.siteSettings.phone), 'Coming soon, call us at 417.335.9915');
  assert.equal(comingSoon(''), 'Coming soon, call us at ');
});

test('venue hours display an explicit conflict follow-up', () => {
  const coffee = fixtures.hours.find((item) => item.place === 'coffee');
  assert.ok(coffee);
  const card = hoursCards(coffee, new Date('2026-10-20T18:00:00.000Z'))[0];
  assert.match(card?.body ?? '', /Hours need confirmation/);
  assert.equal(coffee.lastVerified, '2026-10-20');
});

test('a playground season change renders a different open status', () => {
  const playground = fixtures.hours.find((item) => item.place === 'playground');
  assert.ok(playground);
  const june = hoursCards(playground, new Date('2026-06-15T18:00:00.000Z'));
  const may = hoursCards(playground, new Date('2026-05-15T18:00:00.000Z'));
  assert.equal(june[0]?.title, 'Open now');
  assert.equal(may[0]?.title, 'Hours');
  assert.notEqual(june[0]?.body, may[0]?.body);
  assert.ok(june.some((card) => card.title === 'School year'));
  assert.ok(june.some((card) => card.title === 'June and July' && card.body.startsWith('June 1 – July 31')));
  assert.ok(june.some((card) => card.title === 'August' && card.body.startsWith('August 1 – August 31')));
  assert.equal(june.filter((card) => card.title === 'School year')[0]?.body.includes('TODO'), false);
});

test('tiny house notes render newest first and an empty list stays empty', () => {
  assert.deepEqual(newestUpdates([]), []);
  const newest = newestUpdates([
    {
      id: 'older',
      title: 'Older',
      body: 'First note.',
      publishedOn: '2026-01-02',
      sourceUrl: 'https://elevatebranson.org/elevate-community/',
      verify: true,
    },
    {
      id: 'newer',
      title: 'Newer',
      body: 'Second note.',
      publishedOn: '2026-03-04',
      sourceUrl: 'https://elevatebranson.org/elevate-community/',
      verify: true,
    },
  ]);
  assert.deepEqual(
    newest.map((item) => item.id),
    ['newer', 'older'],
  );
});
