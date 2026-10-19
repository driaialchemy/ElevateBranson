import { Button } from '@/components/Button';
import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';

export default function NewsletterScreen() {
  const { data } = useContent();
  const issues = [...data.newsletters].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));

  return (
    <Screen>
      <ContentNotice />
      {issues.length === 0 ? (
        <EmptyState body="No newsletter has been published in the app yet." title="Newsletter" />
      ) : (
        issues.map((issue) => (
          <Button
            key={issue.id}
            label={`${issue.title}, ${issue.publishedOn}`}
            onPress={() => openExternal(issue.url)}
          />
        ))
      )}
    </Screen>
  );
}
