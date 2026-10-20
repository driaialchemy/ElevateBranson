import { freshnessNote } from '@/content/freshness';
import { formatSeasonDays, formatSeasonRange, seasonTitle } from '@/content/format';
import { describeOpenStatus, getOpenStatus } from '@/content/openStatus';
import type { Hours } from '@/content/types';

export const readOnWebsite = 'Read this on the website';
export const whoItServes = 'Who it serves';
export const howToHelp = 'How to get involved';

export function comingSoon(phone: string): string {
  return `Coming soon, call us at ${phone}`;
}

export function hoursCards(hours: Hours, now = new Date()): { title: string; body: string }[] {
  const described = describeOpenStatus(getOpenStatus(hours, now, 'America/Chicago'));
  const note = freshnessNote(hours.lastVerified, now);
  const seasons = hours.seasons ?? [];
  return [
    { title: described.title, body: [described.body, note, hours.conflict ? `Hours need confirmation: ${hours.conflict}` : ''].filter(Boolean).join('\n') },
    ...seasons.map((season) => {
      const range = formatSeasonRange(season);
      const days = formatSeasonDays(season);
      return { title: seasonTitle(season), body: range ? `${range}\n${days}` : days };
    }),
  ];
}
