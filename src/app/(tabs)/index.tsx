import { Image, Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { ListItem } from '@/components/ListItem';
import { Screen } from '@/components/Screen';
import { latestNews, nextEvent } from '@/content/cache';
import { homeQuickActions } from '@/navigation/map';
import { tokens } from '@/theme/tokens';

export default function HomeScreen() {
  return (
    <Screen>
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
      <View style={{ gap: tokens.space.sm }}>
        {homeQuickActions.map((action) => (
          <ListItem href={action.href} key={action.href} label={action.label} />
        ))}
      </View>
      <Card body={latestNews.body} title={latestNews.title} />
      <Card body={nextEvent.body} title={nextEvent.title} />
    </Screen>
  );
}
