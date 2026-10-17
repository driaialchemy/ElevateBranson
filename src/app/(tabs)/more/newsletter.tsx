import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { latestNewsletter } from '@/content/query';

export default function NewsletterScreen() {
  const { data } = useContent();
  const issues = [...data.newsletters].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
  const newest = latestNewsletter(data.newsletters);

  return (
    <Screen>
      <ContentNotice />
      {newest ? (
        <Button label="Read the newest issue" onPress={() => openExternal(newest.url)} />
      ) : (
        <EmptyState body="No newsletter has been published in the app yet." title="Newsletter" />
      )}
      {issues.map((issue) => (
        <Card body={`Published ${issue.publishedOn}.`} key={issue.id} title={issue.title} />
      ))}
    </Screen>
  );
}
