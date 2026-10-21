import assert from 'node:assert/strict';
import test from 'node:test';

import { fixtures } from './fixtures.ts';

const blocked = ['Cathy', 'Daniel.Friday', 'Donna', 'Betsy', '417.239.7818', '7818'];

test('starter copy keeps unpublished lists empty', () => {
  assert.equal(fixtures.housingListings.length, 0);
  assert.ok(fixtures.resources.length > 0);
  assert.equal(fixtures.events.length, 0);
  assert.equal(fixtures.tinyHouseUpdates.length, 0);
  assert.equal(fixtures.siteSettings.merchUrl, '');
});

test('scraped programs point at the website and are marked for a person to check', () => {
  assert.ok(fixtures.programs.length >= 10);
  for (const program of fixtures.programs) {
    assert.equal(program.verify, true);
    assert.match(program.sourceUrl, /^https:\/\/elevatebranson\.org\//);
    assert.ok(program.summary.length > 20);
  }
});

test('hours keep the published seasons', () => {
  const coffee = fixtures.hours.find((item) => item.place === 'coffee');
  const playground = fixtures.hours.find((item) => item.place === 'playground');
  const thrift = fixtures.hours.find((item) => item.place === 'thrift');
  assert.equal(coffee?.seasons[0]?.days[0]?.opens, '08:00');
  assert.equal(coffee?.seasons[0]?.days[0]?.closes, '15:00');
  assert.equal(coffee?.seasons[0]?.days[5]?.opens, null);
  assert.equal(playground?.seasons.length, 3);
  assert.equal(thrift?.seasons[0]?.days[5]?.opens, '09:00');
  assert.equal(coffee?.seasons[0]?.startDate, 'TODO');
  assert.equal(playground?.seasons.find((item) => item.name === 'School year')?.startDate, 'TODO');
  assert.equal(playground?.seasons.find((item) => item.name === 'June and July')?.startDate, '06-01');
  assert.equal(playground?.seasons.find((item) => item.name === 'August')?.endDate, '08-31');
  assert.equal(coffee?.lastVerified, '2026-10-20');
  assert.deepEqual(coffee?.closures, []);
});

test('starter copy does not include personal staff contacts', () => {
  const text = JSON.stringify(fixtures);
  for (const word of blocked) {
    assert.equal(text.includes(word), false, word);
  }
});

test('newsletters are the public issues', () => {
  assert.ok(fixtures.newsletters.some((issue) => issue.title === 'September 2026 Newsletter'));
  assert.equal(fixtures.siteSettings.address, '310 Gretna Road, Branson, MO 65616');
});

test('homepage figures are the ones published on the website', () => {
  const values = (fixtures.homeStats ?? []).map((stat) => stat.value);
  assert.deepEqual(values, ['22.4%', '1,500+', '-2,200']);
  assert.equal(values.includes('9.3%'), false);
  assert.ok(fixtures.homeSections?.some((section) => section.title === 'Helping Families Break the Cycle of Poverty'));
});

test('giving opens the public donate page and does not store a card', () => {
  assert.equal(fixtures.siteSettings.donateUrl, 'https://elevatebranson.org/donate/');
  assert.match(fixtures.siteSettings.giveBlurb ?? '', /one-time or recurring gift/);
  assert.equal(JSON.stringify(fixtures).toLowerCase().includes('card number'), false);
});
