import { Button } from '@/components/Button';
import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';

export default function MerchScreen() {
  const { data } = useContent();
  const url = data.siteSettings.merchUrl;

  return (
    <Screen>
      <ContentNotice />
      {url ? (
        <Button label="Open the shirt store" onPress={() => openExternal(url)} />
      ) : (
        <EmptyState
          body="No online shirt store was found. This screen will open that store when a link is added."
          title="Merch"
        />
      )}
    </Screen>
  );
}
