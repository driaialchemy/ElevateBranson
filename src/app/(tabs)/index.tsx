import { Image, Text } from 'react-native';

import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { latestNewsletter, nextCalendarEvent, todayIso } from '@/content/query';
import { eventPath, isEventId } from '@/events/schedule';
import { homeQuickActions } from '@/navigation/map';
import { tokens } from '@/theme/tokens';

export default function HomeScreen() {
  const { data } = useContent();
  const issue = latestNewsletter(data.newsletters);
  const upcoming = nextCalendarEvent(data.events, todayIso());

  return (
    <Screen>
      <ContentNotice />
      <Image
        accessibilityLabel="Elevate Branson"
        resizeMode="contain"
        source={require('../../../assets/brand/logo.png')}
        style={{ height: 72, width: 180 }}
      />
      <Text
        style={{
          color: tokens.color.text,
          fontFamily: tokens.font.family.body,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
        }}>
        Programs, events, and ways to help. Most pages are two taps away.
      </Text>
      {homeQuickActions.map((action) => (
        <ListItem href={action.href} key={action.href} label={action.label} />
      ))}
      <Card
        body={
          issue
            ? `${issue.title}. Published ${issue.publishedOn}.`
            : 'No newsletter has been published in the app yet.'
        }
        title="Newest newsletter"
      />
      <Card
        body={
          upcoming
            ? `${upcoming.title}. ${upcoming.startsOn}. ${upcoming.location}`
            : 'No upcoming event is listed yet.'
        }
        title="Next event"
      />
      {upcoming && isEventId(upcoming.id) ? (
        <ListItem href={eventPath(upcoming.id)} label="See this event" />
      ) : null}
    </Screen>
  );
}
