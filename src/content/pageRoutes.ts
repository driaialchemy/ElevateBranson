import type { Page } from '@/content/types';

export function pageBySlug(pages: Page[], slug: string | undefined) {
  return slug ? pages.find((page) => page.slug === slug) : undefined;
}

/** Card text for a page. Menu fragments ("A | B | C"), labels ending in a colon, and leftover protected-email text are not summaries. */
export function pageBlurb(summary: string | undefined): string {
  const text = (summary ?? '').replace(/\[email.protected\]/g, '').replace(/\s+/g, ' ').trim();
  if (text.length < 25 || text.includes(' | ') || text.endsWith(':') || text.startsWith('TODO')) {
    return 'Open this page to read more.';
  }
  return text;
}

export const renderedBlockTypes = [
  'richText', 'buttonRow', 'cardGrid', 'statRow', 'factList', 'table', 'hoursTable', 'contactCard',
  'pdfLink', 'formLink', 'embed', 'faq', 'timeline', 'storyList', 'imageGallery', 'todo',
] as const;
