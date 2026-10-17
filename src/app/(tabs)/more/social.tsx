import { Button } from '@/components/Button';
import { ContentNotice } from '@/components/ContentNotice';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { openExternal } from '@/components/openLink';

export default function SocialScreen() {
  const { data } = useContent();

  return (
    <Screen>
      <ContentNotice />
      {data.siteSettings.socialLinks.map((link) => (
        <Button key={link.url} label={link.label} onPress={() => openExternal(link.url)} />
      ))}
    </Screen>
  );
}
