import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

import { pageBySlug } from '../content/pageRoutes.ts';
import { importedPages } from '../content/sitePages.ts';

const app = new URL('../app/(tabs)/', import.meta.url);

// route -> title the stack shows for it. A route that opens another screen's content would fail one of these checks.
const expected: Record<string, string> = {
  'more/about': 'About Us',
  'more/contact': 'Contact',
  'more/contact-form': 'Send a message',
  'more/resources': 'Resources',
  'more/newsletter': 'Newsletter',
  'more/media': 'Media',
  'more/privacy': 'Privacy',
  'get-involved/volunteer': 'Volunteer',
  'get-involved/volunteer-native': 'Volunteer',
  'get-involved/tour': 'Schedule a tour',
  'get-involved/tour-native': 'Request a tour',
  'get-involved/prayer': 'Prayer request',
  'get-involved/give': 'Give',
};

function layoutTitles(group: string): Map<string, string> {
  const source = readFileSync(new URL(`${group}/_layout.tsx`, app), 'utf8');
  const titles = new Map<string, string>();
  for (const match of source.matchAll(/name="([^"]+)" options=\{\{ title: '([^']+)' \}\}/g)) {
    titles.set(match[1], match[2]);
  }
  return titles;
}

test('each route has its own screen file and the expected title', () => {
  for (const [route, title] of Object.entries(expected)) {
    const [group, name] = route.split('/');
    assert.ok(existsSync(new URL(`${route}.tsx`, app)), `${route} has no screen`);
    assert.equal(layoutTitles(group).get(name), title, route);
  }
});

test('no two routes share one screen title unless they are the same flow', () => {
  const seen = new Map<string, string>();
  for (const route of Object.keys(expected)) {
    const title = expected[route];
    const other = seen.get(title);
    if (other) {
      assert.ok(route.replace('-native', '') === other.replace('-native', ''), `${route} and ${other} share "${title}"`);
    }
    seen.set(title, route);
  }
});

test('top-level tabs and program pages have screens', () => {
  for (const file of ['index.tsx', 'programs/index.tsx', 'programs/[slug].tsx', 'events/index.tsx', 'visit/index.tsx', 'get-involved/index.tsx']) {
    assert.ok(existsSync(new URL(file, app)), file);
  }
});

test('a page slug always returns that page, never another', () => {
  for (const page of importedPages) {
    assert.equal(pageBySlug(importedPages, page.slug)?.slug, page.slug);
  }
  assert.equal(pageBySlug(importedPages, 'no-such-page'), undefined);
  assert.equal(new Set(importedPages.map((page) => page.slug)).size, importedPages.length);
});
