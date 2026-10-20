import type { DayHours, Hours, HoursSeason, Weekday } from '@/content/types';

const labels: Record<Weekday, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

export function formatClock(value: string): string {
  const [hourText, minuteText] = value.split(':');
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const suffix = hour >= 12 ? 'P.M.' : 'A.M.';
  const shown = hour % 12 === 0 ? 12 : hour % 12;
  return `${shown}:${String(minute).padStart(2, '0')} ${suffix}`;
}

export function formatDay(day: DayHours): string {
  const label = labels[day.day];
  if (!day.opens || !day.closes) {
    return `${label}: Closed`;
  }
  return `${label}: ${formatClock(day.opens)} – ${formatClock(day.closes)}`;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function formatMonthDay(value: string | undefined): string {
  if (!value || !/^\d{2}-\d{2}$/.test(value)) {
    return '';
  }
  const month = Number(value.slice(0, 2));
  const day = Number(value.slice(3, 5));
  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return '';
  }
  return `${months[month - 1]} ${day}`;
}

export function seasonTitle(season: HoursSeason): string {
  return season.name || season.label || 'Hours';
}

export function formatSeasonRange(season: HoursSeason): string {
  const start = formatMonthDay(season.startDate);
  const end = formatMonthDay(season.endDate);
  if (!start || !end) {
    return '';
  }
  return `${start} – ${end}`;
}

export function formatSeasonDays(season: HoursSeason): string {
  return (season.days ?? []).map((day) => formatDay(day)).join('\n');
}

export function formatSeason(hours: Hours, seasonLabel: string): string {
  const season = hours.seasons.find((item) => seasonTitle(item) === seasonLabel) ?? hours.seasons[0];
  if (!season) {
    return '';
  }
  return formatSeasonDays(season);
}
