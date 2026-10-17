import AsyncStorage from '@react-native-async-storage/async-storage';

import { isContentBundle } from '@/content/guard';
import type { ContentBundle } from '@/content/types';

const cacheKey = 'elevate-branson-content-v1';

export async function readCache(): Promise<ContentBundle | null> {
  try {
    const raw = await AsyncStorage.getItem(cacheKey);
    if (!raw) {
      return null;
    }
    const parsed: unknown = JSON.parse(raw);
    return isContentBundle(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function writeCache(bundle: ContentBundle): Promise<void> {
  try {
    await AsyncStorage.setItem(cacheKey, JSON.stringify(bundle));
  } catch {
    // A full disk should not hide the copy already on screen.
  }
}
