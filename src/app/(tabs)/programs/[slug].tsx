import { Stack, useLocalSearchParams } from 'expo-router';

import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { Screen } from '@/components/Screen';
import { programBySlug } from '@/content/cache';

export default function ProgramDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const program = typeof slug === 'string' ? programBySlug(slug) : undefined;

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
      <Card body={program.summary} title={program.name} />
    </Screen>
  );
}
