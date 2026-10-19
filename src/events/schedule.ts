import type { CalendarEvent } from '@/content/types';
import { isKnownRoute } from '@/push/topics';

export const eventTimeZone = 'America/Chicago';
export const reminderHour = 9;

const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
const eventIdPattern = /^[A-Za-z0-9_-]{1,80}$/;

export function isEventId(id: string): boolean {
  return eventIdPattern.test(id);
}

export function eventPath(id: string): string {
  return `/events/${id}`;
}

export function isEventPath(href: string): boolean {
  const match = /^\/events\/([^/]+)$/.exec(href);
  return !!match && isEventId(match[1] ?? '');
}

export function isOpenableHref(href: string): boolean {
  return isKnownRoute(href) || isEventPath(href);
}

export function shareText(event: CalendarEvent): string {
  return [event.title, event.startsOn, event.location, event.summary, event.sourceUrl]
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .join('\n');
}

export function allDayWindow(startsOn: string): { start: Date; end: Date } | null {
  const start = zonedDateTime(startsOn, 0, 0);
  const end = zonedDateTime(nextDate(startsOn) ?? '', 0, 0);
  if (!start || !end) {
    return null;
  }
  return { start, end };
}

export function reminderInstant(startsOn: string, now: Date): Date | null {
  const when = zonedDateTime(startsOn, reminderHour, 0);
  if (!when || when.getTime() <= now.getTime()) {
    return null;
  }
  return when;
}

export function zonedDateTime(isoDate: string, hour: number, minute: number): Date | null {
  const parts = dateParts(isoDate);
  if (!parts) {
    return null;
  }
  let guess = Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute, 0);
  for (let step = 0; step < 3; step += 1) {
    const shown = readZone(new Date(guess));
    const shownUtc = Date.UTC(shown.year, shown.month - 1, shown.day, shown.hour, shown.minute, shown.second);
    const desired = Date.UTC(parts.year, parts.month - 1, parts.day, hour, minute, 0);
    guess += desired - shownUtc;
  }
  return new Date(guess);
}

function nextDate(isoDate: string): string | null {
  const parts = dateParts(isoDate);
  if (!parts) {
    return null;
  }
  const next = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + 1));
  const month = String(next.getUTCMonth() + 1).padStart(2, '0');
  const day = String(next.getUTCDate()).padStart(2, '0');
  return `${next.getUTCFullYear()}-${month}-${day}`;
}

function dateParts(isoDate: string): { year: number; month: number; day: number } | null {
  const match = datePattern.exec(isoDate);
  if (!match) {
    return null;
  }
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const check = new Date(Date.UTC(year, month - 1, day));
  if (check.getUTCFullYear() !== year || check.getUTCMonth() !== month - 1 || check.getUTCDate() !== day) {
    return null;
  }
  return { year, month, day };
}

function readZone(date: Date): { year: number; month: number; day: number; hour: number; minute: number; second: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: eventTimeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? '';
  let year = Number(value('year'));
  let month = Number(value('month'));
  let day = Number(value('day'));
  let hour = Number(value('hour'));
  if (hour === 24) {
    hour = 0;
    const rolled = new Date(Date.UTC(year, month - 1, day + 1));
    year = rolled.getUTCFullYear();
    month = rolled.getUTCMonth() + 1;
    day = rolled.getUTCDate();
  }
  return {
    year,
    month,
    day,
    hour,
    minute: Number(value('minute')),
    second: Number(value('second')),
  };
}
