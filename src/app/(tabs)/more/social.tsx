import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';

import { ActionTile } from '@/components/ActionTile';
import { ComingSoon } from '@/components/ComingSoon';
import { ContentNotice } from '@/components/ContentNotice';
import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';
import { tokens } from '@/theme/tokens';

const socialIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Facebook: 'logo-facebook',
  Instagram: 'logo-instagram',
  X: 'logo-twitter',
  LinkedIn: 'logo-linkedin',
};

export default function SocialScreen() {
  const { data } = useContent();
  const links = data.siteSettings.socialLinks;

  return (
    <Screen>
      <ContentNotice />
      <Header donateHref="/get-involved/give" donateLabel={data.siteSettings.donateLabel || 'DONATE NOW'} />
      <SectionHeader label="Social links" />
      {links.length === 0 ? (
        <ComingSoon phone={data.siteSettings.phone} />
      ) : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space.sm }}>
          {links.map((link) => (
            <ActionTile href={link.url} icon={socialIcons[link.label] ?? 'globe-outline'} key={link.url} label={link.label} />
          ))}
        </View>
      )}
    </Screen>
  );
}
