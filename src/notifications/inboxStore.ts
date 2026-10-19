import AsyncStorage from '@react-native-async-storage/async-storage';

import { addInboxNote, type InboxNote } from '@/push/inbox';
import { isKnownRoute } from '@/push/topics';

const inboxKey = 'push-inbox';

export async function readInbox(): Promise<InboxNote[]> {
  try {
    const raw = await AsyncStorage.getItem(inboxKey);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as InboxNote[]) : [];
  } catch {
    return [];
  }
}

export async function rememberNote(note: InboxNote) {
  const notes = await readInbox();
  await AsyncStorage.setItem(inboxKey, JSON.stringify(addInboxNote(notes, note)));
}

export function noteFromContent(content: { title?: string | null; body?: string | null; data?: Record<string, unknown> }): InboxNote | null {
  const href = typeof content.data?.href === 'string' ? content.data.href : '';
  if (!isKnownRoute(href)) {
    return null;
  }
  return {
    id: `${href}-${content.title ?? ''}-${content.body ?? ''}`,
    title: content.title?.trim() || 'Elevate Branson',
    body: content.body?.trim() || '',
    href,
    receivedAt: new Date().toISOString(),
  };
}
