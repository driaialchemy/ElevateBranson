import { Card } from '@/components/Card';
import { EmptyState } from '@/components/EmptyState';
import { Screen } from '@/components/Screen';
import { pageCopy } from '@/content/cache';

export default function ResourcesScreen() {
  const page = pageCopy('resources');

  return (
    <Screen>
      <Card body={page.body} />
      <EmptyState
        body="Staff have not added the housing list yet. No addresses are shown until they do."
        title="Affordable housing"
      />
    </Screen>
  );
}
