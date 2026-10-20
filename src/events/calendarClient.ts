import type { CalendarEvent } from '@/content/types';

export function calendarEndpoint(): string {
  const base = process.env.EXPO_PUBLIC_SUBMIT_URL?.trim();
  if (base && !base.includes('your-worker.example')) return `${base.replace(/\/api\/submit\/?$/, '').replace(/\/$/, '')}/api/events`;
  if (typeof window !== 'undefined') return `${window.location.origin}/api/events`;
  return '';
}

let cache: CalendarEvent[] = [];
export function cachedCalendarEvents(): CalendarEvent[] { return cache; }

export async function refreshCalendarEvents(): Promise<CalendarEvent[]> {
  const endpoint = calendarEndpoint();
  if (!endpoint) throw new Error('The live event calendar is not configured on this device.');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(endpoint, { signal: controller.signal });
    if (!response.ok) throw new Error('The event calendar is temporarily unavailable.');
    const result: unknown = await response.json();
    if (!result || typeof result !== 'object' || !('events' in result) || !Array.isArray(result.events)) throw new Error('The event calendar returned an invalid response.');
    cache = result.events.flatMap((item: unknown, index: number) => {
      if (!item || typeof item !== 'object') return [];
      const row = item as { title?: unknown; time?: unknown; location?: unknown; description?: unknown };
      if (typeof row.title !== 'string' || typeof row.time !== 'string') return [];
      const startsOn = row.time.slice(0, 10);
      const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
      const today = `${parts.find((part) => part.type === 'year')?.value}-${parts.find((part) => part.type === 'month')?.value}-${parts.find((part) => part.type === 'day')?.value}`;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(startsOn) || startsOn < today) return [];
      const timed = row.time.match(/^\d{4}-\d{2}-\d{2}T(\d{2}:\d{2})$/);
      return [{
        id: `public-${startsOn}-${index}`.replace(/[^a-zA-Z0-9_-]/g, '-'), title: row.title, startsOn, time: timed?.[1] ?? '',
        location: typeof row.location === 'string' ? row.location : '', summary: typeof row.description === 'string' ? row.description : '',
        sourceUrl: 'https://elevatebranson.org/event-calendar/', verify: true as const,
      }];
    });
    return cache;
  } finally { clearTimeout(timeout); }
}
