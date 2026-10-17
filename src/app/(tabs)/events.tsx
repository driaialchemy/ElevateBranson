import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';

export default function EventsScreen() {
  const { data } = useContent();

  return (
    <Screen>
      <ContentNotice />
      {data.events.length === 0 ? (
        <EmptyState
          body="The public calendar did not list event names. Staff can add them in the editing site."
          title="No events yet"
        />
      ) : (
        data.events.map((event) => (
          <Card
            body={`${event.startsOn}. ${event.location}. ${event.summary}`}
            key={event.id}
            title={event.title}
          />
        ))
      )}
    </Screen>
  );
}
