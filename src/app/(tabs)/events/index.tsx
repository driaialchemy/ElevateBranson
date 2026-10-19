import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { todayIso, upcomingEvents } from '@/content/query';
import { eventPath, isEventId } from '@/events/schedule';

export default function EventsScreen() {
  const { data } = useContent();
  const events = upcomingEvents(data.events, todayIso());

  return (
    <Screen>
      <ContentNotice />
      {events.length === 0 ? (
        <EmptyState
          body="The public calendar did not list event names. Staff can add them in the editing site."
          title="No events yet"
        />
      ) : (
        events.map((event) =>
          isEventId(event.id) ? (
            <ListItem
              detail={`${event.startsOn}. ${event.location}`}
              href={eventPath(event.id)}
              key={event.id}
              label={event.title}
            />
          ) : (
            <Card body={`${event.startsOn}. ${event.location}. ${event.summary}`} key={event.id} title={event.title} />
          ),
        )
      )}
    </Screen>
  );
}
