import { formatClock, formatDay } from '@/content/format';
import type { DayHours, Hours, HoursSeason, Weekday } from '@/content/types';

export type OpenStatus = {
  state: 'open' | 'closed' | 'unknown';
  todayHours: string | null;
  nextOpen: string | null;
};

type ClockParts = {
  iso: string;
  mmdd: string;
  weekday: Weekday;
  minutes: number;
};

const weekdays: Weekday[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export function getOpenStatus(hours: Hours, now: Date, timeZone = 'America/Chicago'): OpenStatus {
  const parts = clockParts(now, timeZone);
  const seasons = Array.isArray(hours.seasons) ? hours.seasons : [];
  const season = seasons.find((item) => inSeason(parts.mmdd, item));
  if (!season) {
    return { state: 'unknown', todayHours: null, nextOpen: null };
  }

  const closures = Array.isArray(hours.closures) ? hours.closures : [];
  const closure = closures.find((item) => item?.date === parts.iso);
  const today = dayHours(season, parts.weekday);
  const yesterdayParts = shiftDays(parts.iso, -1, timeZone);
  const yesterdaySeason = seasons.find((item) => inSeason(yesterdayParts.mmdd, item));
  const yesterdayClosed = closures.some((item) => item?.date === yesterdayParts.iso);
  const yesterday = yesterdaySeason ? dayHours(yesterdaySeason, yesterdayParts.weekday) : undefined;
  const fromYesterday = !closure && !yesterdayClosed && openFromPreviousSpan(yesterday, parts.minutes);
  const fromToday = !closure && openDuringStartDay(today, parts.minutes);
  const isOpen = fromYesterday || fromToday;

  if (closure) {
    return {
      state: 'closed',
      todayHours: closure.reason ? `Closed. ${closure.reason}` : 'Closed',
      nextOpen: findNextOpen(hours, parts, timeZone),
    };
  }

  const active = fromYesterday && yesterday ? yesterday : today;
  return {
    state: isOpen ? 'open' : 'closed',
    todayHours: active ? formatDay(active) : null,
    nextOpen: isOpen ? null : findNextOpen(hours, parts, timeZone),
  };
}

export function describeOpenStatus(status: OpenStatus): { title: string; body: string } {
  if (status.state === 'unknown') {
    return {
      title: 'Hours',
      body: 'These hours are saved. Open or closed will show after the season dates are confirmed.',
    };
  }
  if (status.state === 'open') {
    return { title: 'Open now', body: status.todayHours ?? 'Open now.' };
  }
  const lines = [status.todayHours ?? 'Closed'];
  if (status.nextOpen) {
    lines.push(`Next open: ${status.nextOpen}`);
  }
  return { title: 'Closed now', body: lines.join('\n') };
}

function inSeason(mmdd: string, season: HoursSeason): boolean {
  const start = season.startDate ?? '';
  const end = season.endDate ?? '';
  if (!/^\d{2}-\d{2}$/.test(start) || !/^\d{2}-\d{2}$/.test(end)) {
    return false;
  }
  if (start <= end) {
    return mmdd >= start && mmdd <= end;
  }
  return mmdd >= start || mmdd <= end;
}

function dayHours(season: HoursSeason, weekday: Weekday): DayHours | undefined {
  return (season.days ?? []).find((day) => day.day === weekday);
}

function toMinutes(value: string): number {
  const [hourText, minuteText] = value.split(':');
  return Number(hourText) * 60 + Number(minuteText);
}

function hasSpan(day: DayHours | undefined): day is DayHours {
  return Boolean(day?.opens && day.closes && day.opens !== day.closes);
}

function openDuringStartDay(day: DayHours | undefined, minutes: number): boolean {
  if (!hasSpan(day)) {
    return false;
  }
  const opens = toMinutes(day.opens as string);
  const closes = toMinutes(day.closes as string);
  if (closes > opens) {
    return minutes >= opens && minutes < closes;
  }
  return minutes >= opens;
}

function openFromPreviousSpan(day: DayHours | undefined, minutes: number): boolean {
  if (!hasSpan(day)) {
    return false;
  }
  const opens = toMinutes(day.opens as string);
  const closes = toMinutes(day.closes as string);
  if (closes > opens) {
    return false;
  }
  return minutes < closes;
}

function findNextOpen(hours: Hours, parts: ClockParts, timeZone: string): string | null {
  const seasons = Array.isArray(hours.seasons) ? hours.seasons : [];
  const closures = Array.isArray(hours.closures) ? hours.closures : [];
  for (let offset = 0; offset < 370; offset += 1) {
    const date = offset === 0 ? parts : shiftDays(parts.iso, offset, timeZone);
    const season = seasons.find((item) => inSeason(date.mmdd, item));
    if (!season || closures.some((item) => item?.date === date.iso)) {
      continue;
    }
    const day = dayHours(season, date.weekday);
    if (!hasSpan(day)) {
      continue;
    }
    if (offset === 0 && parts.minutes >= toMinutes(day.opens as string)) {
      continue;
    }
    return formatNext(offset, date.weekday, day.opens as string);
  }
  return null;
}

function formatNext(offset: number, weekday: Weekday, opens: string): string {
  const clock = formatClock(opens);
  if (offset === 0) {
    return `Today, ${clock}`;
  }
  if (offset === 1) {
    return `Tomorrow, ${clock}`;
  }
  const label = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return `${label}, ${clock}`;
}

function clockParts(now: Date, timeZone: string): ClockParts {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
    hourCycle: 'h23',
  }).formatToParts(now);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  let hour = Number(value('hour'));
  if (hour === 24) {
    hour = 0;
  }
  const minute = Number(value('minute'));
  const month = value('month');
  const day = value('day');
  const weekday = value('weekday').toLowerCase();
  return {
    iso: `${value('year')}-${month}-${day}`,
    mmdd: `${month}-${day}`,
    weekday: weekdays.includes(weekday as Weekday) ? (weekday as Weekday) : 'monday',
    minutes: hour * 60 + minute,
  };
}

function shiftDays(iso: string, days: number, timeZone: string): ClockParts {
  const [year, month, day] = iso.split('-').map(Number);
  return clockParts(new Date(Date.UTC(year, month - 1, day + days, 18, 0, 0)), timeZone);
}
