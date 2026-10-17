import { cmsIsConfigured, isContentBundle } from '@/content/guard';
import { contentQuery } from '@/content/schema';
import type { ContentBundle } from '@/content/types';

const placeholderToken = 'your_read_token';

export function sanityConfig(env: Record<string, string | undefined> = process.env) {
  const projectId = env.EXPO_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = env.EXPO_PUBLIC_SANITY_DATASET?.trim() || 'production';
  const token = env.EXPO_PUBLIC_SANITY_READ_TOKEN?.trim();
  return {
    projectId,
    dataset,
    token: token && token !== placeholderToken ? token : undefined,
    configured: cmsIsConfigured(projectId),
  };
}

export async function fetchSanityContent(
  env: Record<string, string | undefined> = process.env,
): Promise<ContentBundle | null> {
  const config = sanityConfig(env);
  if (!config.configured || !config.projectId) {
    return null;
  }

  const url = new URL(
    `https://${config.projectId}.apicdn.sanity.io/v2021-10-21/data/query/${config.dataset}`,
  );
  url.searchParams.set('query', contentQuery);
  if (config.token) {
    url.searchParams.set('token', config.token);
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      return null;
    }
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== 'object' || !('result' in payload)) {
      return null;
    }
    const result = (payload as { result: unknown }).result;
    return isContentBundle(result) ? result : null;
  } finally {
    clearTimeout(timer);
  }
}
