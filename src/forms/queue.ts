import type { Submission } from '@/forms/schema';

export type QueuedForm = {
  id: string;
  body: Submission;
  createdAt: string;
};

export type PostResult =
  | { kind: 'sent' }
  | { kind: 'invalid' }
  | { kind: 'wait' }
  | { kind: 'retry' };

export function addToQueue(queue: QueuedForm[], item: QueuedForm): QueuedForm[] {
  return [...queue, item];
}

export function removeFromQueue(queue: QueuedForm[], id: string): QueuedForm[] {
  return queue.filter((item) => item.id !== id);
}

export async function flushQueue(
  queue: QueuedForm[],
  post: (body: Submission) => Promise<PostResult>,
): Promise<{ queue: QueuedForm[]; sent: number }> {
  const kept: QueuedForm[] = [];
  let sent = 0;
  for (const item of queue) {
    const result = await post(item.body);
    if (result.kind === 'sent' || result.kind === 'invalid') {
      if (result.kind === 'sent') {
        sent += 1;
      }
      continue;
    }
    kept.push(item);
    if (result.kind === 'wait' || result.kind === 'retry') {
      kept.push(...queue.slice(queue.indexOf(item) + 1));
      break;
    }
  }
  return { queue: kept, sent };
}
