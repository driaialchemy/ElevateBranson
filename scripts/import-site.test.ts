import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { extractPage, inventoryRoutes, writeSeedPage } from './import-site.ts';
import { pageBlockSchema, pageSchema } from '../src/content/schema.ts';

test('extracts page content, links, and image alt text from a saved HTML fixture', async () => {
  const html = await readFile(new URL('./fixtures/site-page.html', import.meta.url), 'utf8');
  const page = extractPage(html, 'https://elevatebranson.org/example/');
  assert.equal(page.title, 'Elevate Example');
  assert.equal(page.summary, 'We help our neighbors through local programs.');
  assert.deepEqual(page.blocks[0], {
    _type: 'richText',
    paragraphs: ['We help our neighbors through local programs.', 'Information reviewed by Elevate Branson.'],
    headings: ['What we do'],
  });
  assert.equal(page.blocks[1]?._type, 'buttonRow');
  assert.deepEqual(page.heroImage, { url: 'https://elevatebranson.org/wp-content/uploads/example.jpg', alt: 'Neighbors working together' });
  assert.equal(JSON.stringify(page).includes('Footer content'), false);

  const elementor = extractPage('<div class="elementor elementor-123"><div><h1>Elementor page</h1><p>Published paragraph.</p><img data-src="/wp-content/uploads/photo.webp" alt="Volunteers at work"></div></div>', 'https://elevatebranson.org/elementor/');
  assert.equal(elementor.title, 'Elementor page');
  assert.equal(elementor.summary, 'Published paragraph.');
  assert.deepEqual(elementor.heroImage, { url: 'https://elevatebranson.org/wp-content/uploads/photo.webp', alt: 'Volunteers at work' });
});

test('validates every supported page block shape and rejects malformed blocks', () => {
  const types = ['richText', 'buttonRow', 'cardGrid', 'statRow', 'factList', 'table', 'hoursTable', 'contactCard', 'pdfLink', 'formLink', 'embed', 'faq', 'timeline', 'storyList', 'imageGallery', 'todo'];
  const blocks = [
    { _type: 'richText', paragraphs: [] }, { _type: 'buttonRow', buttons: [] }, { _type: 'cardGrid', cards: [] },
    { _type: 'statRow', items: [] }, { _type: 'factList', items: [] }, { _type: 'table', headers: [], rows: [] },
    { _type: 'hoursTable', hoursId: 'campus' }, { _type: 'contactCard', name: 'Office' },
    { _type: 'pdfLink', title: 'Guide', url: 'https://elevatebranson.org/guide.pdf' },
    { _type: 'formLink', title: 'Form', url: 'https://elevatebranson.org/form/', interimOnly: true },
    { _type: 'embed', provider: 'spotify', url: 'https://elevatebranson.org/embed' }, { _type: 'faq', items: [] },
    { _type: 'timeline', items: [] }, { _type: 'storyList', storyIds: [] }, { _type: 'imageGallery', images: [] },
    { _type: 'todo', message: 'TODO' },
  ];
  assert.deepEqual(blocks.map((block) => pageBlockSchema.parse(block)._type), types);
  assert.throws(() => pageBlockSchema.parse({ _type: 'unknown' }));
  assert.throws(() => pageSchema.parse({ slug: 'bad', blocks: [{ _type: 'factList', items: [{ label: 'x' }] }] }));
});

test('inventory parsing excludes store and partner plumbing and is stable across runs', () => {
  const source = '# inventory\n## 2. Menu tree\n- About: /about/\n- Get Involved: /volunteer/\n- Not for the app: /cart/ /checkout/ /branding-partners/\n## 3. Page-by-page';
  const first = inventoryRoutes(source);
  assert.deepEqual(first, inventoryRoutes(source));
  assert.ok(first.includes('/volunteer/'));
  assert.ok(!first.includes('/cart/'));
  assert.ok(!first.includes('/branding-partners/'));
});

test('reimporting the same seed page updates one file deterministically', async () => {
  const directory = await mkdtemp(path.join(process.cwd(), 'content', '.import-test-'));
  try {
    const page = {
      slug: 'sample', title: 'Sample', section: 'about' as const, sourceUrl: 'https://elevatebranson.org/sample/',
      summary: 'A saved fixture page.', blocks: [{ _type: 'richText' as const, paragraphs: ['A saved fixture page.'] }],
      lastVerified: '2026-10-20', status: 'verify' as const,
    };
    await writeSeedPage(directory, page);
    const first = await readFile(path.join(directory, 'sample.json'), 'utf8');
    await writeSeedPage(directory, page);
    const second = await readFile(path.join(directory, 'sample.json'), 'utf8');
    assert.equal(second, first);
    assert.deepEqual(await readdir(directory), ['sample.json']);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
