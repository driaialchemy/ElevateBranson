import type { PushStore } from '@/push/send';

export const pushMemory: PushStore = {
  tokens: [],
  lastBroadcastAt: null,
};
