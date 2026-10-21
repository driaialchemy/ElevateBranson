import assert from 'node:assert/strict';
import test from 'node:test';

import { buildParity, normalizePath } from './audit-parity.ts';
import { extractUrls, isBotBlocked, isBroken } from './audit-links.ts';
import { decodeCloudflareEmail } from './import-site.ts';

const base = {
  navigation: [
    { url: 'https://elevatebranson.org/a/', route: '/page/a' },
    { url: 'https://elevatebranson.org/b/', route: '/more/about' },
    { url: 'https://elevatebranson.org/c/', route: '/page/c' },
    { url: 'https://elevatebranson.org/d/e/', route: '/page/d--e' },
  ],
  pageSlugs: new Set(['a', 'd--e']),
  routeExists: (route: string) => route === '/more/about',
  images: [{ slug: 'a', url: 'https://elevatebranson.org/x.jpg' }],
  hasImage: () => false,
};

test('parity classifies native routes, pages, files, exclusions, link-only pages, and gaps', () => {
  const result = buildParity({
    ...base,
    urls: [
      'https://elevatebranson.org/a/',
      'https://elevatebranson.org/b/',
      'https://elevatebranson.org/c/',
      'https://elevatebranson.org/d/e/',
      'https://elevatebranson.org/wp-content/uploads/x.pdf',
      'https://elevatebranson.org/cart/',
      'https://elevatebranson.org/unknown/',
      'https://example.org/off-site/',
    ],
    linkOnlyUrls: ['https://elevatebranson.org/some-story/'],
  });
  const status = Object.fromEntries(result.rows.map((row) => [row.url.replace('https://elevatebranson.org', ''), row.status]));
  assert.deepEqual(status, {
    '/a/': 'PageScreen',
    '/b/': 'native route',
    '/c/': 'MISSING',
    '/d/e/': 'PageScreen',
    '/wp-content/uploads/x.pdf': 'external fallback',
    '/cart/': 'excluded',
    '/unknown/': 'MISSING',
    '/some-story/': 'external fallback',
  });
  assert.equal(result.missingImages.length, 1);
  assert.equal(result.covered, 6);
});

test('paths normalize and other hosts are ignored', () => {
  assert.equal(normalizePath('https://www.elevatebranson.org/a'), '/a/');
  assert.equal(normalizePath('https://other.org/a/'), null);
});

test('link audit extracts urls, skips templates and test hosts, and judges status', () => {
  const urls = extractUrls('open("https://elevatebranson.org/a/"); `https://x.org/${id}`; https://example.org/z');
  assert.deepEqual(urls, ['https://elevatebranson.org/a/']);
  assert.equal(isBotBlocked('https://www.facebook.com/elevatebranson.org/'), true);
  assert.equal(isBroken({ url: 'https://elevatebranson.org/gone/', status: 404, note: '', sources: [] }), true);
  assert.equal(isBroken({ url: 'https://www.facebook.com/x', status: 400, note: '', sources: [] }), false);
  assert.equal(isBroken({ url: 'https://elevatebranson.org/ok/', status: 200, note: '', sources: [] }), false);
});

test('decodes Cloudflare-protected addresses', () => {
  assert.equal(decodeCloudflareEmail('7a3b3a1b3c3a1e0b0c1a17541b0b1a'), '');
  const key = 0x42;
  const hex = key.toString(16) + [...'info@example.com'].map((char) => (char.charCodeAt(0) ^ key).toString(16).padStart(2, '0')).join('');
  assert.equal(decodeCloudflareEmail(hex), 'info@example.com');
});
