import { Card } from '@/components/Card';
import { hoursCards } from '@/content/infoScreens';
import type { Hours } from '@/content/types';

export function HoursBlock({ hours, now = new Date() }: { hours: Hours; now?: Date }) {
  return (
    <>
      {hoursCards(hours, now).map((card, index) => (
        <Card body={card.body} key={`${card.title}-${index}`} title={card.title} />
      ))}
    </>
  );
}
