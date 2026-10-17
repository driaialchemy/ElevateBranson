import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';

export default function WebsiteScreen() {
  const { data } = useContent();
  const url = data.siteSettings.websiteUrl;

  return (
    <Screen>
      <ContentNotice />
      <Card body={url} title="Elevate Branson website" />
      <Button label="Open the website" onPress={() => openExternal(url)} />
    </Screen>
  );
}
