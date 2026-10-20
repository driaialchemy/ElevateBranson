import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { eventById } from '@/content/query';
import { addEventToCalendar, remindAboutEvent, shareEvent } from '@/events/actions';
import { reminderInstant } from '@/events/schedule';
import { cachedCalendarEvents, refreshCalendarEvents } from '@/events/calendarClient';
import { tokens } from '@/theme/tokens';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useContent();
  const [liveEvents, setLiveEvents] = useState(cachedCalendarEvents());
  useEffect(() => { void refreshCalendarEvents().then(setLiveEvents).catch(() => undefined); }, []);
  const event = typeof id === 'string' ? eventById([...data.events, ...liveEvents], id) : undefined;
  const [status, setStatus] = useState('');
  const canRemind = event ? reminderInstant(event.startsOn, new Date()) !== null : false;

  if (!event) {
    return (
      <Screen>
        <EmptyState body="That event is not in the saved list." title="Event not found" />
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: event.title }} />
      <ContentNotice />
      <Card body={`${event.startsOn}${event.time ? ` · ${event.time}` : ''}. ${event.location}. ${event.summary}`} title={event.title} />
      <Button
        label="Add to calendar"
        onPress={() => {
          void addEventToCalendar(event).then((result) => setStatus(result.message));
        }}
      />
      <Button
        label="Share"
        onPress={() => {
          void shareEvent(event).then((result) => setStatus(result.message));
        }}
      />
      {canRemind ? (
        <Button
          label="Remind me"
          onPress={() => {
            void remindAboutEvent(event).then((result) => setStatus(result.message));
          }}
        />
      ) : (
        <Text
          style={{
            color: tokens.color.text,
            fontFamily: tokens.font.family.body,
            fontSize: tokens.font.size.body,
            lineHeight: tokens.font.lineHeight.body,
          }}>
          The morning reminder time for this day has passed.
        </Text>
      )}
      {status ? (
        <Text
          accessibilityLiveRegion="polite"
          style={{
            color: tokens.color.text,
            fontFamily: tokens.font.family.body,
            fontSize: tokens.font.size.body,
            lineHeight: tokens.font.lineHeight.body,
          }}>
          {status}
        </Text>
      ) : null}
    </Screen>
  );
}
