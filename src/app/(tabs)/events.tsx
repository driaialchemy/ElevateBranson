import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { nextEvent, pageCopy } from '@/content/cache';

export default function EventsScreen() {
  const page = pageCopy('events');

  return (
    <Screen>
      <Card body={nextEvent.body} title={nextEvent.title} />
      <Card body={page.body} />
    </Screen>
  );
}
