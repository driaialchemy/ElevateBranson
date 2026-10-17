import { Card } from '@/components/Card';
import { Screen } from '@/components/Screen';
import { pageCopy } from '@/content/cache';

export function FeatureStub({ id }: { id: string }) {
  const page = pageCopy(id);

  return (
    <Screen>
      <Card body={page.body} />
    </Screen>
  );
}
