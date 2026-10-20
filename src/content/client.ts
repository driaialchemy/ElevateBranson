import { useCallback, useEffect, useSyncExternalStore } from 'react';

import { fixtures } from '@/content/fixtures';
import { importedPages } from '@/content/sitePages';
import { useNetwork } from '@/network/NetworkProvider';
import { fetchSanityContent, sanityConfig } from '@/content/remote';
import { settleContent } from '@/content/swr';
import { readCache, writeCache } from '@/content/storage';
import type { ContentBundle } from '@/content/types';

type Snapshot = { data: ContentBundle; error: string | null };

const bundledFixtures: ContentBundle = { ...fixtures, pages: importedPages };
let snapshot: Snapshot = { data: bundledFixtures, error: null };
let generation = 0;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return snapshot;
}

export async function loadContent(online: boolean): Promise<Snapshot> {
  const cached = await readCache();
  const configured = sanityConfig().configured;
  if (!online || !configured) {
    return settleContent({ cached: cached ? { ...cached, pages: cached.pages?.length ? cached.pages : importedPages } : bundledFixtures, remote: null, remoteFailed: false });
  }
  try {
    const remote = await fetchSanityContent();
    if (remote) {
      await writeCache(remote);
    }
    return settleContent({ cached, remote, remoteFailed: remote === null });
  } catch {
    return settleContent({ cached, remote: null, remoteFailed: true });
  }
}

export async function refreshContent(online: boolean) {
  const request = ++generation;
  const result = await loadContent(online);
  if (request !== generation) {
    return;
  }
  snapshot = result;
  emit();
}

export function useContent() {
  const { online } = useNetwork();
  const current = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  useEffect(() => {
    void refreshContent(online);
  }, [online]);

  const retry = useCallback(() => {
    void refreshContent(online);
  }, [online]);

  return { data: current.data, error: current.error, retry };
}
