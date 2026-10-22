import AsyncStorage from '@react-native-async-storage/async-storage';

import { addToQueue, flushQueue, type PostResult, type QueuedForm } from '@/forms/queue';
import { queuedCopy, sentCopy, type Submission } from '@/forms/schema';

const storageKey = 'elevate-form-queue-v1';

export function submitUrl(): string {
  const configured = process.env.EXPO_PUBLIC_SUBMIT_URL?.trim() ?? '';
  if (configured && !configured.includes('your-worker.example')) {
    return configured;
  }
  // No same-origin fallback: a static web host has no /api/submit and would answer with its home page.
  return '';
}

export async function deliverForm(body: Submission, online: boolean): Promise<string> {
  if (!online) {
    await remember(body);
    return queuedCopy;
  }
  const result = await postForm(body);
  if (result.kind === 'sent') {
    return sentCopy[body.type];
  }
  if (result.kind === 'invalid') {
    throw new Error('Please check the form.');
  }
  if (result.kind === 'wait') {
    throw new Error('Please wait a few minutes and try again.');
  }
  await remember(body);
  return queuedCopy;
}

export async function flushStoredForms(): Promise<void> {
  const queue = await readQueue();
  if (queue.length === 0 || !submitUrl()) {
    return;
  }
  const next = await flushQueue(queue, postForm);
  await writeQueue(next.queue);
}

async function postForm(body: Submission): Promise<PostResult> {
  const url = submitUrl();
  if (!url) {
    return { kind: 'retry' };
  }
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, company: body.company ?? '' }),
    });
    if (response.status === 200) {
      // Only the worker answers with { ok: true }; anything else (such as a host's home page) is not a delivery.
      const answer: unknown = await response.json().catch(() => null);
      return answer && typeof answer === 'object' && (answer as { ok?: unknown }).ok === true ? { kind: 'sent' } : { kind: 'retry' };
    }
    if (response.status === 400) {
      return { kind: 'invalid' };
    }
    if (response.status === 429) {
      return { kind: 'wait' };
    }
    return { kind: 'retry' };
  } catch {
    return { kind: 'retry' };
  }
}

async function remember(body: Submission) {
  const queue = await readQueue();
  const item: QueuedForm = {
    id: `${Date.now()}-${queue.length}`,
    body,
    createdAt: new Date().toISOString(),
  };
  await writeQueue(addToQueue(queue, item));
}

async function readQueue(): Promise<QueuedForm[]> {
  try {
    const raw = await AsyncStorage.getItem(storageKey);
    if (!raw) {
      return [];
    }
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as QueuedForm[]) : [];
  } catch {
    return [];
  }
}

async function writeQueue(queue: QueuedForm[]) {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(queue));
  } catch {
    // Keep the in-memory attempt. The screen still tells the person what happened.
  }
}
