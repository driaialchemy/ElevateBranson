import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { pageBlurb, pageBySlug, renderedBlockTypes } from './pageRoutes.ts';
import type { Page, PageBlock } from './types.ts';

const page: Page = { slug: 'sample', title: 'Sample', section: 'about', sourceUrl: 'https://elevatebranson.org/sample/', summary: 'Summary', blocks: [], lastVerified: '2026-10-20', status: 'verify' };

describe('generic page routes', () => {
  it('resolves a known page and returns undefined for an unknown slug', () => {
    assert.equal(pageBySlug([page], 'sample'), page);
    assert.equal(pageBySlug([page], 'missing'), undefined);
  });

  it('covers every SP-01 block type in its renderer contract', () => {
    const types: PageBlock['_type'][] = [...renderedBlockTypes];
    assert.equal(new Set(types).size, 16);
    assert.deepEqual(types, ['richText', 'buttonRow', 'cardGrid', 'statRow', 'factList', 'table', 'hoursTable', 'contactCard', 'pdfLink', 'formLink', 'embed', 'faq', 'timeline', 'storyList', 'imageGallery', 'todo']);
  });
});

describe('page blurbs', () => {
  it('drop menu fragments and protected-email leftovers', () => {
    assert.equal(pageBlurb('Privacy Policy | Contact Us | Brand Partnership'), 'Open this page to read more.');
    assert.equal(pageBlurb('Direct Contact:'), 'Open this page to read more.');
    assert.equal(pageBlurb(undefined), 'Open this page to read more.');
    assert.equal(pageBlurb('We help neighbors find work, housing, and hope in Branson.'), 'We help neighbors find work, housing, and hope in Branson.');
  });
});
