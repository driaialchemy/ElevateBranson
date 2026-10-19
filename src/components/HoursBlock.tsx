import { Card } from '@/components/Card';
import { freshnessNote } from '@/content/freshness';
import { formatSeasonDays, seasonTitle } from '@/content/format';
import { describeOpenStatus, getOpenStatus } from '@/content/openStatus';
import type { Hours } from '@/content/types';

export function HoursBlock({ hours }: { hours: Hours }) {
  const now = new Date();
  const described = describeOpenStatus(getOpenStatus(hours, now, 'America/Chicago'));
  const note = freshnessNote(hours.lastVerified, now);
  const seasons = hours.seasons ?? [];

  return (
    <>
      <Card body={note ? `${described.body}\n${note}` : described.body} title={described.title} />
      {seasons.map((season, index) => (
        <Card
          body={formatSeasonDays(season)}
          key={`${seasonTitle(season)}-${index}`}
          title={seasonTitle(season)}
        />
      ))}
    </>
  );
}
