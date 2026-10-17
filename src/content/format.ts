import type { DayHours, Hours, Weekday } from '@/content/types';

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

export function formatSeason(hours: Hours, seasonLabel: string): string {
  const season = hours.seasons.find((item) => item.label === seasonLabel) ?? hours.seasons[0];
  if (!season) {
    return '';
  }
  return season.days.map((day) => formatDay(day)).join('\n');
}
