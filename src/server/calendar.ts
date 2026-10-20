import { parseCalendarIcs, type IcsEvent } from '@/events/ics';

export const calendarIcsUrl = 'https://calendar.google.com/calendar/ical/0dm7t2r2joluqd8seemjqfmb80%40group.calendar.google.com/public/basic.ics';
const ttl = 15 * 60 * 1000;
const headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' };

export function createCalendarHandler(options: {
  fetcher?: typeof fetch;
  now?: () => number;
  cache?: Map<string, { until: number; items: IcsEvent[] }>;
} = {}) {
  const fetcher = options.fetcher ?? fetch;
  const now = options.now ?? Date.now;
  const cache = options.cache ?? new Map<string, { until: number; items: IcsEvent[] }>();
  return async function handleCalendar(request: Request): Promise<Response> {
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'GET') return response(405, { error: 'The event list is not available right now. Please try again.' });
    const cached = cache.get('public-calendar');
    if (cached && cached.until > now()) return response(200, { events: cached.items });
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10_000);
    try {
      const upstream = await fetcher(calendarIcsUrl, { signal: controller.signal });
      if (!upstream.ok) throw new Error('calendar-unavailable');
      const text = await upstream.text();
      const items = parseCalendarIcs(text);
      cache.set('public-calendar', { until: now() + ttl, items });
      return response(200, { events: items });
    } catch {
      return response(503, { error: 'The event calendar is temporarily unavailable. Open the website calendar for the latest schedule.' });
    } finally {
      clearTimeout(timer);
    }
  };
}

function response(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), { status, headers });
}

export const handleCalendar = createCalendarHandler();
