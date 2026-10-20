import assert from 'node:assert/strict';
import test from 'node:test';

import { createCalendarHandler } from './calendar.ts';

const feed = 'BEGIN:VCALENDAR\nBEGIN:VEVENT\nDTSTART;VALUE=DATE:20261101\nSUMMARY:Community event\nLOCATION:Campus\nDESCRIPTION:Public description\nEND:VEVENT\nEND:VCALENDAR';

test('serves a public feed event and caches it for fifteen minutes', async () => {
  let now = 0;
  let calls = 0;
  const handler = createCalendarHandler({ now: () => now, fetcher: async () => { calls += 1; return new Response(feed, { status: 200 }); } });
  const first = await handler(new Request('https://worker.test/api/events'));
  const firstBody = await first.json() as { events: Record<string, string>[] };
  assert.equal(first.status, 200);
  assert.equal(firstBody.events[0]?.title, 'Community event');
  assert.deepEqual(Object.keys(firstBody.events[0] ?? {}).sort(), ['description', 'location', 'time', 'title']);
  now = 14 * 60 * 1000;
  await handler(new Request('https://worker.test/api/events'));
  assert.equal(calls, 1);
  now = 16 * 60 * 1000;
  await handler(new Request('https://worker.test/api/events'));
  assert.equal(calls, 2);
});

test('uses a friendly failure response when the public feed fails', async () => {
  const handler = createCalendarHandler({ fetcher: async () => new Response('', { status: 403 }) });
  const response = await handler(new Request('https://worker.test/api/events'));
  assert.equal(response.status, 503);
  assert.match(JSON.stringify(await response.json()), /website calendar/);
});
