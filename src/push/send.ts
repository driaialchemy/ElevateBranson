import { recipients, type PushTokenRecord } from '@/push/audience';
import { isKnownRoute, routeForTopic, type Topic } from '@/push/topics';

export const pushBatchSize = 100;
export const broadcastCooldownMs = 15 * 60 * 1000;

export type PushMessage = {
  to: string;
  title: string;
  body: string;
  data: { href: string; topic: Topic | 'all' };
};

export type PushStore = {
  tokens: PushTokenRecord[];
  lastBroadcastAt: number | null;
};

export function chunkMessages(messages: PushMessage[], size = pushBatchSize): PushMessage[][] {
  const batches: PushMessage[][] = [];
  for (let index = 0; index < messages.length; index += size) {
    batches.push(messages.slice(index, index + size));
  }
  return batches;
}

export function secretsMatch(given: string, expected: string): boolean {
  const left = given.trim();
  const right = expected.trim();
  const length = Math.max(left.length, right.length);
  let mismatch = left.length === right.length ? 0 : 1;
  for (let index = 0; index < length; index += 1) {
    mismatch |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }
  return mismatch === 0 && left.length > 0;
}

export function secretConfigured(value: string | undefined): boolean {
  const trimmed = value?.trim() ?? '';
  return trimmed.length >= 12 && trimmed !== 'your_staff_secret' && trimmed !== 'change-me';
}

export function reviewSend(input: {
  secret: string;
  expectedSecret: string | undefined;
  confirmed: boolean;
  testOnly: boolean;
  preview: boolean;
  lastBroadcastAt: number | null;
  now: number;
}): { ok: true } | { ok: false; status: number; message: string } {
  if (!secretConfigured(input.expectedSecret) || !input.expectedSecret) {
    return { ok: false, status: 503, message: 'The staff page is not ready yet.' };
  }
  if (!secretsMatch(input.secret, input.expectedSecret)) {
    return { ok: false, status: 401, message: 'That password is not right.' };
  }
  if (input.testOnly || input.preview) {
    return { ok: true };
  }
  if (!input.confirmed) {
    return { ok: false, status: 400, message: 'Confirm the note before it is sent.' };
  }
  if (input.lastBroadcastAt !== null && input.now - input.lastBroadcastAt < broadcastCooldownMs) {
    return { ok: false, status: 429, message: 'Wait 15 minutes before sending another note.' };
  }
  return { ok: true };
}

export function buildMessages(
  records: PushTokenRecord[],
  input: { title: string; body: string; topic: Topic | 'all'; href?: string },
): PushMessage[] {
  const href = input.href && isKnownRoute(input.href) ? input.href : routeForTopic(input.topic);
  return recipients(records, input.topic).map((record) => ({
    to: record.token,
    title: input.title,
    body: input.body,
    data: { href, topic: input.topic },
  }));
}

export type ExpoTicket = {
  status: string;
  id?: string;
  details?: { error?: string };
};

export type ExpoReceipt = {
  status: string;
  details?: { error?: string };
};

export function tokensFromReceiptErrors(
  messages: PushMessage[],
  tickets: ExpoTicket[],
  receipts: Record<string, ExpoReceipt>,
): string[] {
  const remove: string[] = [];
  messages.forEach((message, index) => {
    const ticket = tickets[index];
    if (!ticket) {
      return;
    }
    if (ticket.status === 'error' && ticket.details?.error === 'DeviceNotRegistered') {
      remove.push(message.to);
      return;
    }
    if (ticket.id && receipts[ticket.id]?.details?.error === 'DeviceNotRegistered') {
      remove.push(message.to);
    }
  });
  return remove;
}

export async function deliverBatches(
  messages: PushMessage[],
  sendBatch: (batch: PushMessage[]) => Promise<ExpoTicket[]>,
  loadReceipts: (ids: string[]) => Promise<Record<string, ExpoReceipt>>,
): Promise<{ tickets: ExpoTicket[]; receipts: Record<string, ExpoReceipt>; remove: string[] }> {
  const tickets: ExpoTicket[] = [];
  for (const batch of chunkMessages(messages)) {
    const result = await sendBatch(batch);
    tickets.push(...result);
  }
  const ids = tickets.flatMap((ticket) => (ticket.id ? [ticket.id] : []));
  const receipts = ids.length > 0 ? await loadReceipts(ids) : {};
  return { tickets, receipts, remove: tokensFromReceiptErrors(messages, tickets, receipts) };
}
