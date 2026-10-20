import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/Button';
import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { openExternal } from '@/components/openLink';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import { useContent } from '@/content/client';
import { upcomingEvents } from '@/content/query';
import { eventPath, isEventId } from '@/events/schedule';
import { cachedCalendarEvents, refreshCalendarEvents } from '@/events/calendarClient';

export default function EventsScreen() {
  const { data } = useContent();
  const [events, setEvents] = useState(cachedCalendarEvents().length ? cachedCalendarEvents() : data.events);
  const [fallback, setFallback] = useState(false);
  useEffect(() => { let mounted = true; void refreshCalendarEvents().then((items) => { if (mounted) setEvents(items); }).catch(() => { if (mounted) setFallback(true); }); return () => { mounted = false; }; }, []);
  const today = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date()).map((part) => [part.type, part.value]));
  const upcoming = upcomingEvents(events, `${today.year}-${today.month}-${today.day}`);
  const dates = [...new Set(upcoming.map((event) => event.startsOn))];

  return (
    <Screen>
      <ContentNotice />
      {upcoming.length === 0 ? (
        <EmptyState
          body={fallback ? 'Check the website calendar for current events.' : 'There are no upcoming public events.'}
          title={fallback ? 'Calendar unavailable' : 'No upcoming events'}
        />
      ) : (
        dates.map((date) => <View key={date}><SectionHeader label={date} />{upcoming.filter((event) => event.startsOn === date).map((event) =>
          isEventId(event.id) ? (
            <ListItem
              detail={`${event.time || 'All day'}${event.location ? ` · ${event.location}` : ''}`}
              href={eventPath(event.id)}
              icon="calendar-outline"
              key={event.id}
              label={event.title}
            />
          ) : (
            <ListItem detail={`${event.time || 'All day'} · ${event.location}`} href={eventPath(event.id)} icon="calendar-outline" key={event.id} label={event.title} />
          ),
        )}</View>)
      )}
      <Button label="Open website calendar" onPress={() => openExternal('https://elevatebranson.org/event-calendar/')} />
    </Screen>
  );
}
