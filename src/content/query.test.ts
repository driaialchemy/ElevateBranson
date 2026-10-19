import assert from 'node:assert/strict';
import test from 'node:test';

import { filterResources, nextCalendarEvent, resourceCategories, visibleHousing } from './query.ts';
import type { CalendarEvent, HousingListing, Resource } from './types.ts';

const resources: Resource[] = [
  {
    id: 'a',
    name: 'Food Pantry',
    category: 'Food',
    summary: 'Groceries on Tuesday',
    phone: '4175550101',
    address: '1 Main Street',
    sourceUrl: 'https://example.org/a',
    verify: true,
  },
  {
    id: 'b',
    name: 'Clinic',
    category: 'Health',
    summary: 'Walk-in care',
    phone: '4175550102',
    address: '2 Main Street',
    sourceUrl: 'https://example.org/b',
    verify: true,
  },
];

test('search and category narrow the partner list', () => {
  assert.deepEqual(
    filterResources(resources, 'pantry', 'All').map((item) => item.id),
    ['a'],
  );
  assert.deepEqual(
    filterResources(resources, '', 'Health').map((item) => item.id),
    ['b'],
  );
  assert.deepEqual(filterResources(resources, 'clinic', 'Food'), []);
  assert.deepEqual(resourceCategories(resources), ['All', 'Food', 'Health']);
});

test('housing without a last-checked date stays hidden', () => {
  const listings: HousingListing[] = [
    {
      id: 'dated',
      name: 'Public listing',
      phone: '4175550100',
      address: '1 Main Street',
      summary: 'Public office',
      sourceUrl: 'https://example.org',
      verify: true,
      lastVerified: '2026-10-17',
    },
    {
      id: 'undated',
      name: 'Missing date',
      phone: '4175550109',
      address: '2 Main Street',
      summary: 'No check date',
      sourceUrl: 'https://example.org',
      verify: true,
    },
  ];
  assert.deepEqual(
    visibleHousing(listings).map((item) => item.id),
    ['dated'],
  );
});

test('the next event is the soonest one that has not passed', () => {
  const events: CalendarEvent[] = [
    {
      id: 'old',
      title: 'Old',
      summary: '',
      startsOn: '2026-01-01',
      location: 'Campus',
      sourceUrl: 'https://example.org',
      verify: true,
    },
    {
      id: 'soon',
      title: 'Soon',
      summary: '',
      startsOn: '2026-11-02',
      location: 'Campus',
      sourceUrl: 'https://example.org',
      verify: true,
    },
  ];
  assert.equal(nextCalendarEvent(events, '2026-10-17')?.id, 'soon');
  assert.equal(nextCalendarEvent([], '2026-10-17'), undefined);
});
