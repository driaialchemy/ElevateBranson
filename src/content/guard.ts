import type { ContentBundle } from '@/content/types';

export function isContentBundle(value: unknown): value is ContentBundle {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    Array.isArray(record.programs) &&
    Array.isArray(record.events) &&
    Array.isArray(record.resources) &&
    Array.isArray(record.housingListings) &&
    Array.isArray(record.tinyHouseUpdates) &&
    Array.isArray(record.hours) &&
    Array.isArray(record.newsletters) &&
    !!record.siteSettings &&
    typeof record.siteSettings === 'object'
  );
}

export function cmsIsConfigured(projectId: string | undefined): boolean {
  const trimmed = projectId?.trim() ?? '';
  return trimmed.length > 0 && trimmed !== 'your_project_id';
}
