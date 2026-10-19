import { Text } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { isBrowserLink } from '@/content/links';
import { tokens } from '@/theme/tokens';

export default function GiveScreen() {
  const { data } = useContent();
  const url = data.siteSettings.donateUrl.trim();
  const blurb = data.siteSettings.giveBlurb?.trim() || data.siteSettings.mission;

  return (
    <Screen>
      <ContentNotice />
      <Text
        accessibilityRole="header"
        style={{
          color: tokens.color.text,
          fontFamily: tokens.font.family.heading,
          fontSize: tokens.font.size.title,
          lineHeight: tokens.font.lineHeight.title,
        }}>
        Give
      </Text>
      <Card body={blurb} title="Your gift" />
      {isBrowserLink(url) ? (
        <Button label="Give on the website" onPress={() => openExternal(url)} />
      ) : (
        <EmptyState body="The donate page link is not ready yet." title="Give" />
      )}
      <Text
        style={{
          color: tokens.color.text,
          fontFamily: tokens.font.family.body,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
        }}>
        This app does not take card numbers. The gift is completed on the Elevate Branson website.
      </Text>
    </Screen>
  );
}
