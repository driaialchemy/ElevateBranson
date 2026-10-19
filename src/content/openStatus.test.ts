import assert from 'node:assert/strict';
import test from 'node:test';

import { getOpenStatus } from './openStatus.ts';
import type { DayHours, Hours, HoursSeason, Weekday } from './types.ts';

const weekdays: Weekday[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function days(open: Partial<Record<Weekday, [string, string]>>): DayHours[] {
  return weekdays.map((day) => {
    const span = open[day];
    return span ? { day, opens: span[0], closes: span[1] } : { day, opens: null, closes: null };
  });
}

function hours(seasons: HoursSeason[], closures: Hours['closures'] = []): Hours {
  return {
    id: 'test-hours',
    place: 'playground',
    seasons,
    closures,
    sourceUrl: 'https://example.org/hours',
    verify: true,
  };
}

const summerWeek = {
  monday: ['13:00', '17:30'],
  tuesday: ['13:00', '17:30'],
  wednesday: ['13:00', '17:30'],
  thursday: ['13:00', '17:30'],
  friday: ['13:00', '17:30'],
} as const;

const playground = hours([
  {
    name: 'June and July',
    startDate: '06-01',
    endDate: '07-31',
    days: days(summerWeek),
  },
  {
    name: 'August',
    startDate: '08-01',
    endDate: '08-31',
    days: days({ monday: ['09:00', '17:30'] }),
  },
]);

test('season boundary days are included', () => {
  const first = getOpenStatus(playground, new Date('2026-06-01T18:00:00.000Z'), 'America/Chicago');
  const last = getOpenStatus(playground, new Date('2026-07-31T18:00:00.000Z'), 'America/Chicago');
  assert.equal(first.state, 'open');
  assert.equal(last.state, 'open');
  assert.match(last.todayHours ?? '', /1:00 P\.M\./);
});

test('a day outside every season stays unknown', () => {
  const status = getOpenStatus(playground, new Date('2026-05-31T18:00:00.000Z'), 'America/Chicago');
  assert.equal(status.state, 'unknown');
  assert.equal(status.todayHours, null);
  assert.equal(status.nextOpen, null);
});

test('a closed weekday names the next open time', () => {
  const status = getOpenStatus(playground, new Date('2026-06-06T18:00:00.000Z'), 'America/Chicago');
  assert.equal(status.state, 'closed');
  assert.match(status.todayHours ?? '', /Saturday: Closed/);
  assert.equal(status.nextOpen, 'Monday, 1:00 P.M.');
});

test('Sunday uses the saved weekly hours', () => {
  const status = getOpenStatus(playground, new Date('2026-06-07T18:00:00.000Z'), 'America/Chicago');
  assert.equal(status.state, 'closed');
  assert.match(status.todayHours ?? '', /Sunday: Closed/);
  assert.equal(status.nextOpen, 'Tomorrow, 1:00 P.M.');
});

test('a holiday closure overrides the weekly hours', () => {
  const closed = hours(playground.seasons, [{ date: '2026-06-15', reason: 'Staff holiday' }]);
  const status = getOpenStatus(closed, new Date('2026-06-15T18:00:00.000Z'), 'America/Chicago');
  assert.equal(status.state, 'closed');
  assert.equal(status.todayHours, 'Closed. Staff holiday');
  assert.equal(status.nextOpen, 'Tomorrow, 1:00 P.M.');
});

test('hours that pass midnight stay open after midnight', () => {
  const late = hours([
    {
      name: 'Summer',
      startDate: '06-01',
      endDate: '07-31',
      days: days({ friday: ['22:00', '02:00'] }),
    },
  ]);
  const during = getOpenStatus(late, new Date('2026-06-06T06:00:00.000Z'), 'America/Chicago');
  const after = getOpenStatus(late, new Date('2026-06-06T08:00:00.000Z'), 'America/Chicago');
  assert.equal(during.state, 'open');
  assert.match(during.todayHours ?? '', /10:00 P\.M\./);
  assert.equal(after.state, 'closed');
});

test('Central time is used when the instant is a different day elsewhere', () => {
  const status = getOpenStatus(playground, new Date('2026-06-15T04:30:00.000Z'), 'America/Chicago');
  const utc = getOpenStatus(playground, new Date('2026-06-15T04:30:00.000Z'), 'UTC');
  assert.equal(status.state, 'closed');
  assert.equal(status.nextOpen, 'Tomorrow, 1:00 P.M.');
  assert.equal(utc.nextOpen, 'Today, 1:00 P.M.');
});

test('saved hours without season dates do not crash', () => {
  const legacy = {
    id: 'old',
    place: 'coffee',
    seasons: [{ label: 'Coffee shop', days: days({ monday: ['08:00', '15:00'] }) }],
    sourceUrl: 'https://elevatebranson.org/',
    verify: true,
  } as Hours;
  const status = getOpenStatus(legacy, new Date('2026-06-15T18:00:00.000Z'), 'America/Chicago');
  assert.equal(status.state, 'unknown');
});
