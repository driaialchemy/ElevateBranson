import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { programBySlug } from '@/content/query';

export default function TinyHouseScreen() {
  const { data } = useContent();
  const program = programBySlug(data.programs, 'elevate-community');

  return (
    <Screen>
      <ContentNotice />
      {program ? <Card body={program.summary} title={program.name} /> : null}
      {program ? (
        <Button label="Read this on the website" onPress={() => openExternal(program.sourceUrl)} />
      ) : null}
      {data.tinyHouseUpdates.length === 0 ? (
        <EmptyState
          body="No dated progress note has been published yet."
          title="Tiny house updates"
        />
      ) : (
        data.tinyHouseUpdates.map((update) => (
          <Card body={`${update.publishedOn}. ${update.body}`} key={update.id} title={update.title} />
        ))
      )}
    </Screen>
  );
}
