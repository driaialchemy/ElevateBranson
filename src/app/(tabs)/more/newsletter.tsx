import { Button } from '@/components/Button';
import { ComingSoon } from '@/components/ComingSoon';
import { ContentNotice } from '@/components/ContentNotice';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';

export default function NewsletterScreen() {
  const { data } = useContent();
  const issues = [...data.newsletters].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));

  return (
    <Screen>
      <ContentNotice />

      <SectionHeader label="Newsletter" />
      {issues.length === 0 ? (
        <ComingSoon phone={data.siteSettings.phone} />
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
