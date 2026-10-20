import type { Page } from '@/content/types';

export function pageBySlug(pages: Page[], slug: string | undefined) {
  return slug ? pages.find((page) => page.slug === slug) : undefined;
}

export const renderedBlockTypes = [
  'richText', 'buttonRow', 'cardGrid', 'statRow', 'factList', 'table', 'hoursTable', 'contactCard',
  'pdfLink', 'formLink', 'embed', 'faq', 'timeline', 'storyList', 'imageGallery', 'todo',
] as const;
