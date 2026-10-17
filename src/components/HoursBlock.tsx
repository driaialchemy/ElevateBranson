import { Card } from '@/components/Card';
import { formatSeason } from '@/content/format';
import type { Hours } from '@/content/types';

export function HoursBlock({ hours }: { hours: Hours }) {
  return (
    <>
      {hours.seasons.map((season) => (
        <Card body={formatSeason(hours, season.label)} key={season.label} title={season.label} />
      ))}
    </>
  );
}
