import { ErrorState } from '@/components/ErrorState';
import { useContent } from '@/content/client';

export function ContentNotice() {
  const { error, retry } = useContent();
  if (!error) {
    return null;
  }
  return <ErrorState message={error} onRetry={retry} />;
}
