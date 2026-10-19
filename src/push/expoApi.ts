import type { ExpoReceipt, ExpoTicket, PushMessage } from '@/push/send';

export async function sendExpoBatch(batch: PushMessage[], fetchImpl: typeof fetch = fetch): Promise<ExpoTicket[]> {
  const response = await fetchImpl('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(batch),
  });
  if (!response.ok) {
    throw new Error('push-failed');
  }
  const payload = (await response.json()) as { data?: ExpoTicket[] };
  return Array.isArray(payload.data) ? payload.data : [];
}

export async function loadExpoReceipts(
  ids: string[],
  fetchImpl: typeof fetch = fetch,
): Promise<Record<string, ExpoReceipt>> {
  if (ids.length === 0) {
    return {};
  }
  const response = await fetchImpl('https://exp.host/--/api/v2/push/getReceipts', {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids }),
  });
  if (!response.ok) {
    return {};
  }
  const payload = (await response.json()) as { data?: Record<string, ExpoReceipt> };
  return payload.data ?? {};
}
