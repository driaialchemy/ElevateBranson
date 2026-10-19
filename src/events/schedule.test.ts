import assert from 'node:assert/strict';
import test from 'node:test';

import type { CalendarEvent } from '@/content/types';

import { allDayWindow, isEventPath, isOpenableHref, reminderInstant, shareText, zonedDateTime } from './schedule.ts';

const sample: CalendarEvent = {
  id: 'open-house',
  title: 'Campus open house',
  summary: 'A public visit on campus.',
  startsOn: '2026-11-02',
  location: '310 Gretna Road, Branson, MO 65616',
  sourceUrl: 'https://elevatebranson.org/',
  verify: true,
};

test('event times use Central Time, including daylight saving', () => {
  assert.equal(zonedDateTime('2026-01-15', 9, 0)?.toISOString(), '2026-01-15T15:00:00.000Z');
  assert.equal(zonedDateTime('2026-07-15', 9, 0)?.toISOString(), '2026-07-15T14:00:00.000Z');
  assert.equal(zonedDateTime('2026-02-31', 9, 0), null);
});

test('an all-day event covers that Central Time date', () => {
  const winter = allDayWindow('2026-01-15');
  const summer = allDayWindow('2026-07-15');
  assert.equal(winter?.start.toISOString(), '2026-01-15T06:00:00.000Z');
  assert.equal(winter?.end.toISOString(), '2026-01-16T06:00:00.000Z');
  assert.equal(summer?.start.toISOString(), '2026-07-15T05:00:00.000Z');
  assert.equal(summer?.end.toISOString(), '2026-07-16T05:00:00.000Z');
});

test('a reminder is 9:00 a.m. Central Time and only before that moment', () => {
  const when = reminderInstant('2026-11-02', new Date('2026-11-01T12:00:00.000Z'));
  assert.equal(when?.toISOString(), '2026-11-02T15:00:00.000Z');
  assert.equal(reminderInstant('2026-11-02', new Date('2026-11-02T15:00:00.000Z')), null);
});

test('share text is the public event and notes open only known app pages', () => {
  const text = shareText(sample);
  assert.match(text, /Campus open house/);
  assert.match(text, /https:\/\/elevatebranson\.org\//);
  assert.equal(text.includes('@'), false);
  assert.equal(isEventPath('/events/open-house'), true);
  assert.equal(isEventPath('/events/open-house/edit'), false);
  assert.equal(isEventPath('https://elevatebranson.org/'), false);
  assert.equal(isOpenableHref('/get-involved/give'), true);
  assert.equal(isOpenableHref('/events/open-house'), true);
  assert.equal(isOpenableHref('https://elevatebranson.org/donate/'), false);
});
