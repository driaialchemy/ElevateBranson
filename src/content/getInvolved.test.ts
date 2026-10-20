import assert from 'node:assert/strict';
import test from 'node:test';

import { availableTourDates, givingDetails, useNativeForms, volunteerImages, volunteerOpportunities, volunteerStories } from './getInvolved.ts';
import { importedPages } from './sitePages.ts';

test('each volunteer opportunity has the fields shown on its card and a website form', () => {
  assert.equal(volunteerOpportunities.length, 6);
  for (const opportunity of volunteerOpportunities) {
    assert.ok(opportunity.title);
    assert.ok(opportunity.schedule);
    assert.ok(opportunity.description);
    assert.ok(opportunity.ageRules);
    assert.ok(opportunity.groupSize);
    assert.ok(opportunity.formUrl?.startsWith('https://elevatebranson.org/'));
    assert.ok(volunteerImages[opportunity.id]);
  }
  assert.equal(useNativeForms, false);
});

test('tour date choices omit weekend dates and data-listed holidays', () => {
  const dates = availableTourDates('2026-11-25', 7, givingDetails.tourHolidays);
  assert.deepEqual(dates, ['2026-11-25', '2026-11-27', '2026-11-30', '2026-12-01']);
  const holidays = new Set<string>(givingDetails.tourHolidays);
  assert.ok(dates.every((date) => !holidays.has(date)));
  assert.ok(dates.every((date) => ![0, 6].includes(new Date(`${date}T12:00:00`).getDay())));
});

test('meet our volunteers data exposes nineteen profile cards with story detail', () => {
  const page = importedPages.find((item) => item.slug === 'meet-our-volunteers');
  const profiles = volunteerStories(page);
  assert.equal(profiles.length, 19);
  assert.ok(profiles.every((profile) => profile.name && profile.body));
  assert.ok(profiles.every((profile) => !profile.body.startsWith('Read more about')));
});
