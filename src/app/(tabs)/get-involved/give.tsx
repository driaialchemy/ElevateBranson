import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';

export default function GiveScreen() {
  const { data } = useContent();
  const url = data.siteSettings.donateUrl;

  return (
    <Screen>
      <ContentNotice />
      <Card
        body="Donations open the Elevate Branson website. This app does not take card numbers."
        title="Give"
      />
      <Button label="Give on the website" onPress={() => openExternal(url)} />
    </Screen>
  );
}
