import { Stack, useLocalSearchParams } from 'expo-router';

import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
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
    </Screen>
  );
}
