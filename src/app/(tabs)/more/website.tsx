import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ComingSoon } from '@/components/ComingSoon';
import { ContentNotice } from '@/components/ContentNotice';
import { Header } from '@/components/Header';
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
      <Header donateHref="/get-involved/give" donateLabel={data.siteSettings.donateLabel || 'DONATE NOW'} />
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
