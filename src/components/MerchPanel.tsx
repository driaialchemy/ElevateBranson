import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { isBrowserLink } from '@/content/links';

export function MerchPanel() {
  const { data } = useContent();
  const url = data.siteSettings.merchUrl.trim();

  return (
    <Screen>
      <ContentNotice />
      {isBrowserLink(url) ? (
        <>
          <Card
            body="Shirts are sold on the Elevate Branson store page. This app does not take card numbers."
            title="Merch"
          />
          <Button label="Open the shirt store" onPress={() => openExternal(url)} />
        </>
      ) : (
        <EmptyState
          body="No online shirt store was found. This screen will open that store when a link is added. This app does not take card numbers."
          title="Merch"
        />
      )}
    </Screen>
  );
}
