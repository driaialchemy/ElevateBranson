import assert from 'node:assert/strict';
import test from 'node:test';

import { parseCalendarIcs } from './ics.ts';

test('parses all-day events and publishes only the four approved fields', () => {
  const ics = ['BEGIN:VCALENDAR', 'BEGIN:VEVENT', 'UID:all-day', 'DTSTART;VALUE=DATE:20261101', 'DTEND;VALUE=DATE:20261102', 'SUMMARY:Community meal', 'LOCATION:Branson', 'DESCRIPTION:Neighbors welcome\\nBring a friend', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const events = parseCalendarIcs(ics, new Date('2026-10-01T00:00:00Z'));
  assert.deepEqual(events, [{ title: 'Community meal', time: '2026-11-01', location: 'Branson', description: 'Neighbors welcome\nBring a friend' }]);
  assert.deepEqual(Object.keys(events[0] ?? {}).sort(), ['description', 'location', 'time', 'title']);
});

test('expands recurring events and excludes removed occurrences', () => {
  const ics = ['BEGIN:VCALENDAR', 'BEGIN:VEVENT', 'UID:weekly', 'DTSTART;TZID=America/Chicago:20261102T090000', 'DTEND;TZID=America/Chicago:20261102T100000', 'RRULE:FREQ=WEEKLY;BYDAY=MO;COUNT=4', 'EXDATE;TZID=America/Chicago:20261116T090000', 'SUMMARY:Weekly class', 'LOCATION:Campus', 'DESCRIPTION:Class', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const events = parseCalendarIcs(ics, new Date('2026-11-01T00:00:00Z'), 30);
  assert.deepEqual(events.map((event) => event.time), ['2026-11-02T09:00', '2026-11-09T09:00', '2026-11-23T09:00']);
});

test('keeps wall-clock time in the event time zone across daylight saving', () => {
  const ics = ['BEGIN:VCALENDAR', 'BEGIN:VEVENT', 'DTSTART;TZID=America/Chicago:20260308T090000', 'SUMMARY:Spring event', 'END:VEVENT', 'END:VCALENDAR'].join('\n');
  assert.equal(parseCalendarIcs(ics, new Date('2026-03-01T00:00:00Z'))[0]?.time, '2026-03-08T09:00');
});

test('hides past events', () => {
  const ics = ['BEGIN:VCALENDAR', 'BEGIN:VEVENT', 'DTSTART;VALUE=DATE:20260101', 'SUMMARY:Past', 'END:VEVENT', 'END:VCALENDAR'].join('\n');
  assert.deepEqual(parseCalendarIcs(ics, new Date('2026-02-01T00:00:00Z')), []);
});
