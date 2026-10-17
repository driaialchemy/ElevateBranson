import { fixtures } from '@/content/fixtures';
import type { ContentBundle } from '@/content/types';

export const refreshError =
  "We couldn't refresh the latest pages. You're seeing the last saved copy.";

export function settleContent(input: {
  cached: ContentBundle | null;
  remote: ContentBundle | null;
  remoteFailed: boolean;
}): { data: ContentBundle; error: string | null } {
  if (input.remote) {
    return { data: input.remote, error: null };
  }
  return {
    data: input.cached ?? fixtures,
    error: input.remoteFailed ? refreshError : null,
  };
}
