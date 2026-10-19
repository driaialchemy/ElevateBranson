import { Stack, useLocalSearchParams } from 'expo-router';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { programBySlug } from '@/content/query';

export default function ProgramDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data } = useContent();
  const program = typeof slug === 'string' ? programBySlug(data.programs, slug) : undefined;

  if (!program) {
    return (
      <Screen>
        <EmptyState body="That program is not in the saved list." title="Program not found" />
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: program.name }} />
      <ContentNotice />
      <Card body={program.summary} title={program.name} />
      <Button label="Read this on the website" onPress={() => openExternal(program.sourceUrl)} />
    </Screen>
  );
}
