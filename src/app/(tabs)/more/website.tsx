import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ComingSoon } from '@/components/ComingSoon';
import { ContentNotice } from '@/components/ContentNotice';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';

export default function WebsiteScreen() {
  const { data } = useContent();
  const url = data.siteSettings.websiteUrl;

  return (
    <Screen>
      <ContentNotice />

      <SectionHeader label="Website" />
      {url ? (
        <>
          <Card body={url} title="Elevate Branson website" />
          <Button label="Open the website" onPress={() => openExternal(url)} />
        </>
      ) : (
        <ComingSoon phone={data.siteSettings.phone} />
      )}
    </Screen>
  );
}
