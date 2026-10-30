import type { ContentBundle, Page, PageBlock } from './types.ts';

/** Pages the 2026-10-29 note removed from the app. Import must not put them back. */
export const removedPageSlugs = new Set(['elevate-life', 'elevate-outreach']);

const outreachBlurb = 'Elevate Outreach : Sacks and delivers hundreds of basic meals to residents of extended stay motels weekly in the Branson community. ';

const rentBefore = 'Residents will rent a fully furnished home for $495 per month, which includes utilities and trash removal.';
const rentAfter = 'Rent $520/month, all utilities included. Income limit applies.';
const petBefore = 'Yes. With management approval, residents may have one small pet. There is an additional pet charge and leashes are required when outside of the tiny home.';
const petAfter = '1 pet maximum.';

function stripOutreachBlurb(text: string): string {
  return text.split(outreachBlurb).join('');
}

function isTimelineHeading(heading: string): boolean {
  return heading === 'ELEVATE COMMUNITY TIMELINE' || heading === 'The Road To Today' || /^20\d\d$/.test(heading);
}

function stripTimelineParagraphs(paragraphs: string[]): string[] {
  const start = paragraphs.findIndex((paragraph) => /ELEVATE COMMUNITY TIMELINE/i.test(paragraph));
  if (start < 0) return paragraphs;
  let end = start + 1;
  while (end < paragraphs.length && !/^(?:ELEVATE COMMUNITY F\.A\.Q\.|MEDIA COVERAGE|TINY HOMES, BIG HOPE)/.test(paragraphs[end] ?? '')) end += 1;
  return [...paragraphs.slice(0, start), ...paragraphs.slice(end)];
}

function patchCommunityParagraph(text: string): string {
  return text.replace(rentBefore, rentAfter).replace(petBefore, petAfter);
}

function mapBlocks(page: Page, map: (block: PageBlock) => PageBlock | null): Page {
  return { ...page, blocks: page.blocks.flatMap((block) => {
    const next = map(block);
    return next ? [next] : [];
  }) };
}

function ensureContact(page: Page, contact: { name: string; phone: string }): Page {
  const blocks = page.blocks.filter((block) => !(block._type === 'contactCard' && (block.name === contact.name || block.name === 'Jordanna Boyd')));
  return { ...page, blocks: [...blocks, { _type: 'contactCard', name: contact.name, phone: contact.phone }] };
}

function ensureHours(page: Page, hoursId: string): Page {
  if (page.blocks.some((block) => block._type === 'hoursTable' && block.hoursId === hoursId)) return page;
  return { ...page, blocks: [...page.blocks, { _type: 'hoursTable', hoursId }] };
}

function patchCommunity(page: Page): Page {
  const stripped = mapBlocks(page, (block) => {
    if (block._type === 'timeline') return null;
    if (block._type !== 'richText') return block;
    return {
      ...block,
      paragraphs: stripTimelineParagraphs(block.paragraphs).map(patchCommunityParagraph),
      headings: (block.headings ?? []).filter((heading) => !isTimelineHeading(heading)),
    };
  });
  return ensureContact(stripped, { name: 'Kristol France', phone: '417-203-0886' });
}

function patchRides(page: Page): Page {
  return mapBlocks(page, (block) => {
    if (block._type === 'richText') {
      return {
        ...block,
        paragraphs: block.paragraphs.filter((paragraph) => !/affordable, motorized scooters/i.test(paragraph)),
        headings: (block.headings ?? []).filter((heading) => !/OWNERSHIP PROGRAM/i.test(heading) && !/^Step \d+\./.test(heading)),
      };
    }
    if (block._type === 'buttonRow') {
      return { ...block, buttons: block.buttons.filter((button) => !/business partner/i.test(button.label) && !/^Step \d+\./.test(button.label)) };
    }
    return block;
  });
}

function patchKids(page: Page): Page {
  return mapBlocks(page, (block) => {
    if (block._type !== 'richText') return block;
    return {
      ...block,
      paragraphs: block.paragraphs.filter((paragraph) => !paragraph.startsWith('Fill out the form below')),
      headings: (block.headings ?? []).filter((heading) => heading !== 'Questions About Our Elevate Kids Programs And Services?'),
    };
  });
}

function patchMentions(page: Page): Page {
  return {
    ...page,
    summary: stripOutreachBlurb(page.summary),
    blocks: page.blocks.map((block) => block._type === 'richText'
      ? { ...block, paragraphs: block.paragraphs.map(stripOutreachBlurb) }
      : block),
  };
}

function withoutHero(page: Page): Page {
  if (!page.heroImage) return page;
  const rest = { ...page };
  delete rest.heroImage;
  return rest;
}

/** Client corrections applied to a page after import. Null means the page stays out of the app. */
export function applyClientOverrides(page: Page): Page | null {
  if (removedPageSlugs.has(page.slug)) return null;
  if (page.slug === 'elevate-community') return patchCommunity(page);
  if (page.slug === 'elevate-rides') return patchRides(page);
  if (page.slug === 'elevate-kids') return patchKids(page);
  if (page.slug === 'elevate-connections') return ensureContact(page, { name: 'Garrett Moore', phone: '417-239-7818' });
  if (page.slug === 'volunteer') return ensureContact(page, { name: 'Betsy Foster', phone: '417-593-2254' });
  if (page.slug === 'theo') return withoutHero(page);
  if (page.slug === 'elevate-health') return ensureHours(page, 'health');
  if (page.slug === 'elevate-cafe-and-coffee') return ensureHours(ensureHours(page, 'coffee'), 'cafe');
  if (page.slug === 'frequently-asked-questions' || page.slug === 'media-center') return patchMentions(page);
  return page;
}

export function hideRemovedContent(bundle: ContentBundle): ContentBundle {
  return {
    ...bundle,
    programs: bundle.programs.filter((item) => !removedPageSlugs.has(item.slug)),
    pages: (bundle.pages ?? []).filter((item) => !removedPageSlugs.has(item.slug)),
  };
}
