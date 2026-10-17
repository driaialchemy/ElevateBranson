import { EmptyState } from '@/components/EmptyState';
import { Screen } from '@/components/Screen';

export default function MerchScreen() {
  return (
    <Screen>
      <EmptyState
        body="No online shirt store was found. A link will show here when staff add one."
        title="Merch"
      />
    </Screen>
  );
}
