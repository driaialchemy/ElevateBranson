import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';
import type { Page, PageBlock, PageSection } from '../src/content/types';
import { pageSchema } from '../src/content/schema';

const ROOT = process.cwd();
const ORIGIN = 'https://elevatebranson.org';
const INVENTORY = path.join(ROOT, 'docs', 'SITE_INVENTORY.md');
const PAGE_DIR = path.join(ROOT, 'content', 'pages');
const ASSET_DIR = path.join(ROOT, 'assets', 'site');
const MANIFEST = path.join(ROOT, 'content', 'manifest.json');
const IMPORT_DATE = new Date().toISOString().slice(0, 10);
let lastRequestAt = 0;
let assetBytes = 0;
const imageCache = new Map<string, Promise<{ url: string; alt: string } | undefined>>();

export type ExtractedPage = Pick<Page, 'title' | 'summary' | 'blocks' | 'heroImage'>;

function decodeEntities(value: string): string {
  return value.replace(/&nbsp;|&#160;/gi, ' ').replace(/&amp;/gi, '&').replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'").replace(/&lt;/gi, '<').replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, n: string) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n: string) => String.fromCodePoint(parseInt(n, 16)));
}

function plainText(html: string): string {
  return decodeEntities(html.replace(/<br\s*\/?\s*>/gi, ' ').replace(/<[^>]+>/g, ' '))
    .replace(/[\t\r\n ]+/g, ' ').trim();
}

function mainRegion(html: string): string {
  const clean = html.replace(/<(script|style|nav|footer|header|svg|form)[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  const semantic = clean.match(/<(?:main|article)\b[^>]*>([\s\S]*?)<\/(?:main|article)>/i);
  if (semantic) return semantic[1] ?? '';
  const openingTags = [...clean.matchAll(/<div\b[^>]*>/gi)];
  const opening = openingTags.find((match) => /class=["'][^"']*\bentry-content\b/i.test(match[0] ?? ''))
    ?? openingTags.find((match) => /class=["'][^"']*\belementor\s+elementor-\d+/i.test(match[0] ?? ''));
  if (!opening || opening.index === undefined) return '';
  let depth = 0;
  let end = opening.index + opening[0].length;
  for (const token of clean.slice(opening.index).matchAll(/<\/?div\b[^>]*>/gi)) {
    const tag = token[0] ?? '';
    if (/^<\//.test(tag)) depth -= 1;
    else if (!/\/\s*>$/.test(tag)) depth += 1;
    if (depth === 0) { end = opening.index + (token.index ?? 0) + tag.length; break; }
  }
  return clean.slice(opening.index, end);
}

function attribute(attrs: string, name: string): string | undefined {
  return attrs.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1];
}

/** Cloudflare hides addresses as hex: the first byte is an XOR key for the rest. */
export function decodeCloudflareEmail(hex: string): string {
  if (hex.length < 4 || hex.length % 2 !== 0) return '';
  const key = parseInt(hex.slice(0, 2), 16);
  let email = '';
  for (let index = 2; index < hex.length; index += 2) email += String.fromCharCode(parseInt(hex.slice(index, index + 2), 16) ^ key);
  return /^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email) ? email : '';
}

function safeUrl(raw: string, base: string): string | undefined {
  try { return new URL(decodeEntities(raw.trim()), base).toString(); }
  catch { return undefined; }
}

export function inventoryRoutes(markdown: string): string[] {
  const excluded = new Set(['/forms/13/', '/forms/30/', '/cart/', '/checkout/', '/my-account/', '/staff-page/', '/crisis-communication-plan/', '/branding-partners/']);
  const section = markdown.split('## 2. Menu tree')[1]?.split('## 3. Page-by-page')[0] ?? '';
  const appRoutes = section.split('- Not for the app:')[0] ?? '';
  const matches = appRoutes.match(/\/(?:[a-z0-9-]+\/)+/gi) ?? [];
  const routes = new Set<string>(['/']);
  for (const found of matches) {
    let route = found;
    if (!route.startsWith('/')) continue;
    if (route.startsWith('//')) continue;
    if (!route.endsWith('/')) route += '/';
    if (route.startsWith('/wp-content/') || excluded.has(route) || route.startsWith('/thank-you-')) continue;
    routes.add(route);
  }
  // The inventory lists a small set of useful detail pages outside the menu tree.
  const detailPatterns = [
    /\/(?:volunteer-form-[a-z-]+|forms\/\d+|elevate-work-student-application-2|elevate-branding-licensure-pre-vetting-questionnaire|elevate-kids-sponsorship|elevate-community-sponsorship|ryan-fains-story)\/?/gi,
    /\/privacy-policy\//gi,
  ];
  for (const pattern of detailPatterns) {
    for (const match of markdown.matchAll(pattern)) routes.add(match[0].endsWith('/') ? match[0] : `${match[0]}/`);
  }
  for (const pageNumber of [2, 3, 4]) routes.add(`/meet-our-neighbors/${pageNumber}/`);
  routes.add('/donate/');
  return [...routes].sort((a, b) => a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b));
}

export function extractPage(html: string, pageUrl: string): ExtractedPage {
  const region = mainRegion(html);
  const title = plainText(region.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? '') ||
    plainText(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '') || 'TODO: title not extracted';
  const headings = [...region.matchAll(/<h[2-6]\b[^>]*>([\s\S]*?)<\/h[2-6]>/gi)].map((m) => plainText(m[1] ?? '')).filter(Boolean);
  const paragraphs = [...region.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].map((m) => plainText(m[1] ?? '')).filter(Boolean);
  const links = [...region.matchAll(/<a\b([^>]*?)href=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi)]
    .flatMap((m) => {
      const label = plainText(m[4] ?? '');
      const rawHref = decodeEntities((m[2] ?? '').trim());
      const protectedMail = /\/cdn-cgi\/l\/email-protection#([0-9a-f]+)$/i.exec(rawHref);
      if (protectedMail) {
        const email = decodeCloudflareEmail(protectedMail[1]);
        return label && email ? [{ label: /^\[email.protected\]$/.test(label) ? email : label, url: `mailto:${email}` }] : [];
      }
      const url = safeUrl(rawHref, pageUrl);
      return label && url && /^https?:/.test(url) ? [{ label, url }] : [];
    });
  const images: { url: string; alt: string }[] = [];
  for (const match of region.matchAll(/<img\b([^>]*)>/gi)) {
    const attrs = match[1] ?? '';
    const rawUrl = attribute(attrs, 'data-lazy-src') ?? attribute(attrs, 'data-src') ?? attribute(attrs, 'src') ?? attribute(attrs, 'srcset')?.split(',')[0]?.trim().split(/\s+/)[0];
    const alt = decodeEntities(attribute(attrs, 'alt') ?? '').trim();
    if (!rawUrl || !alt) continue;
    const url = safeUrl(rawUrl, pageUrl);
    if (url?.startsWith(`${ORIGIN}/`)) images.push({ url, alt });
  }
  for (const match of region.matchAll(/<(?:section|div)\b([^>]*)style=["'][^"']*background(?:-image)?\s*:[^"']*url\(["']?([^)'"\s]+)["']?\)[^"']*["'][^>]*>/gi)) {
    const attrs = match[1] ?? '';
    const alt = decodeEntities(attribute(attrs, 'aria-label') ?? attribute(attrs, 'data-alt') ?? '').trim();
    if (!alt) continue;
    const url = safeUrl(match[2] ?? '', pageUrl);
    if (url?.startsWith(`${ORIGIN}/`)) images.push({ url, alt });
  }
  const blocks: PageBlock[] = [];
  if (paragraphs.length || headings.length) blocks.push({ _type: 'richText', paragraphs, headings });
  else blocks.push({ _type: 'todo', message: 'TODO: page text could not be extracted; add reviewed content.' });
  if (links.length) blocks.push({ _type: 'buttonRow', buttons: links });
  if (images.length) blocks.push({ _type: 'imageGallery', images });
  const hero = images[0];
  return {
    title,
    summary: paragraphs[0] ?? 'TODO: summary not available from extracted page text.',
    blocks,
    ...(hero ? { heroImage: hero } : {}),
  };
}

function sectionFor(route: string): PageSection {
  if (/^\/(?:elevate-community|elevate-rides|elevate-work|computer-classes|elevate-entrepreneurs|elevate-health|elevate-kids|theo|elevate-outreach|elevate-connections|elevate-life)\//.test(route)) return 'what-we-do';
  if (/^\/(?:volunteer|meet-our-volunteers|advance-team|business-partnership|schedule-a-tour|branding-licensure|leaving-a-legacy|rewards-program|donate|elevate-kids-sponsorship)\//.test(route)) return 'get-involved';
  if (/^\/(?:elevate-branson-campus|elevate-cafe-and-coffee|elevate-playground|elevate-thrift-store|facility-rentals)\//.test(route)) return 'visit';
  if (/^\/(?:media-center|podcast|news|videos|press-releases)\//.test(route)) return 'media';
  if (/^\/(?:contact-us)\//.test(route)) return 'contact';
  return 'about';
}

function slugFor(route: string): string { return route === '/' ? 'home' : route.replace(/^\/+|\/+$/g, '').replaceAll('/', '--'); }

export async function writeSeedPage(directory: string, page: Page): Promise<void> {
  pageSchema.parse(page);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, `${page.slug}.json`), `${JSON.stringify(page, null, 2)}\n`);
}

async function limitedFetch(url: string, init?: RequestInit): Promise<Response> {
  const delay = Math.max(0, 1000 - (Date.now() - lastRequestAt));
  if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
  lastRequestAt = Date.now();
  return fetch(url, init);
}

async function fetchRobots(): Promise<string> {
  const response = await limitedFetch(`${ORIGIN}/robots.txt`, { headers: { 'user-agent': 'ElevateBransonAppContentImporter/1.0' } });
  return response.ok ? response.text() : '';
}

function allowedByRobots(robots: string, route: string): boolean {
  let active = false;
  for (const raw of robots.split(/\r?\n/)) {
    const line = raw.split('#')[0]?.trim() ?? '';
    const [key, value] = line.split(':', 2).map((part) => part.trim());
    if (!key || value === undefined) continue;
    if (/^user-agent$/i.test(key)) active = value === '*' || /ElevateBransonAppContentImporter/i.test(value);
    if (active && /^disallow$/i.test(key) && value && route.startsWith(value)) return false;
  }
  return true;
}

async function saveImage(url: string, alt: string): Promise<{ url: string; alt: string } | undefined> {
  const cached = imageCache.get(url);
  if (cached) {
    const saved = await cached;
    return saved ? { ...saved, alt } : undefined;
  }
  const pending = saveImageOnce(url, alt);
  imageCache.set(url, pending);
  return pending;
}

async function saveImageOnce(url: string, alt: string): Promise<{ url: string; alt: string } | undefined> {
  try {
    const response = await limitedFetch(url, { headers: { 'user-agent': 'ElevateBransonAppContentImporter/1.0' } });
    if (!response.ok) return undefined;
    const source = Buffer.from(await response.arrayBuffer());
    const key = createHash('sha1').update(url).digest('hex').slice(0, 16);
    const filename = `${key}.webp`;
    await mkdir(ASSET_DIR, { recursive: true });
    let quality = 78;
    let output = await sharp(source).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality }).toBuffer();
    while (output.length >= 200_000 && quality > 35) {
      quality -= 8;
      output = await sharp(source).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality }).toBuffer();
    }
    if (output.length >= 200_000 || assetBytes + output.length > 60 * 1024 * 1024) return undefined;
    await writeFile(path.join(ASSET_DIR, filename), output);
    assetBytes += output.length;
    return { url: `/assets/site/${filename}`, alt };
  } catch { return undefined; }
}

export async function importSite(): Promise<{ pages: number; images: number; conflicts: number }> {
  const inventory = await readFile(INVENTORY, 'utf8');
  const routes = inventoryRoutes(inventory);
  const robots = await fetchRobots();
  await mkdir(PAGE_DIR, { recursive: true });
  const existingAssets = await readdir(ASSET_DIR).catch(() => [] as string[]);
  assetBytes = (await Promise.all(existingAssets.map(async (name) => (await stat(path.join(ASSET_DIR, name))).size))).reduce((a, b) => a + b, 0);
  const manifest: { slug: string; sourceUrl: string; importedAt: string; status: 'verify'; error?: string }[] = [];
  for (const route of routes) {
    const slug = slugFor(route);
    const sourceUrl = new URL(route, ORIGIN).toString();
    if (!allowedByRobots(robots, route)) {
      manifest.push({ slug, sourceUrl, importedAt: new Date().toISOString(), status: 'verify', error: 'Disallowed by robots.txt' });
      continue;
    }
    try {
      const response = await limitedFetch(sourceUrl, { redirect: 'follow', headers: { 'user-agent': 'ElevateBransonAppContentImporter/1.0' } });
      if (!response.ok || new URL(response.url).hostname !== 'elevatebranson.org') throw new Error(`HTTP ${response.status}; redirected outside allowed host`);
      const extracted = extractPage(await response.text(), sourceUrl);
      const updatedBlocks: PageBlock[] = [];
      for (const block of extracted.blocks) {
        if (block._type !== 'imageGallery') { updatedBlocks.push(block); continue; }
        const downloaded = [];
        for (const image of block.images) {
          const saved = await saveImage(image.url, image.alt);
          if (saved) downloaded.push(saved);
        }
        if (downloaded.length) updatedBlocks.push({ _type: 'imageGallery', images: downloaded });
      }
      const savedHero = extracted.heroImage ? await saveImage(extracted.heroImage.url, extracted.heroImage.alt) : undefined;
      const page: Page = {
        slug, title: extracted.title, section: sectionFor(route), sourceUrl,
        ...(savedHero ? { heroImage: savedHero } : {}), summary: extracted.summary,
        blocks: updatedBlocks, lastVerified: IMPORT_DATE, status: 'verify',
      };
      await writeSeedPage(PAGE_DIR, page);
      manifest.push({ slug, sourceUrl, importedAt: new Date().toISOString(), status: 'verify' });
      console.log(`Imported ${sourceUrl}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const todo: Page = { slug, title: 'TODO: title not imported', section: sectionFor(route), sourceUrl, summary: 'TODO: content could not be retrieved.', blocks: [{ _type: 'todo', message: `TODO: importer error: ${message}` }], lastVerified: IMPORT_DATE, status: 'verify' };
      await writeSeedPage(PAGE_DIR, todo);
      manifest.push({ slug, sourceUrl, importedAt: new Date().toISOString(), status: 'verify', error: message });
      console.error(`Failed ${sourceUrl}: ${message}`);
    }
  }
  await writeFile(MANIFEST, `${JSON.stringify({ sourceUrl: ORIGIN, importedAt: new Date().toISOString(), status: 'verify', pages: manifest }, null, 2)}\n`);
  const conflictNotes = await readFile(path.join(ROOT, 'docs', 'CONTENT_CONFLICTS.md'), 'utf8');
  const conflicts = (conflictNotes.match(/^\d+\.\s+\*\*/gm) ?? []).length;
  const finalAssets = await readdir(ASSET_DIR).catch(() => [] as string[]);
  return { pages: manifest.length, images: finalAssets.length, conflicts };
}

export async function checkImport(): Promise<void> {
  const manifest = JSON.parse(await readFile(MANIFEST, 'utf8')) as { pages: { slug: string; sourceUrl: string; error?: string }[] };
  const pageFiles = await readdir(PAGE_DIR);
  const imageFiles = await readdir(ASSET_DIR).catch(() => [] as string[]);
  let brokenLinks = 0;
  const checkedLinks = new Set<string>();
  for (const filename of pageFiles.filter((name) => name.endsWith('.json'))) {
    const page = JSON.parse(await readFile(path.join(PAGE_DIR, filename), 'utf8')) as Page;
    for (const block of page.blocks) {
      const urls = block._type === 'buttonRow' ? block.buttons.map((item) => item.url) : [];
      for (const value of urls) {
        let url: URL;
        try { url = new URL(value); } catch { brokenLinks += 1; continue; }
        if (!['elevatebranson.org', 'www.elevatebranson.org'].includes(url.hostname)) continue;
        url.hash = '';
        const normalized = url.toString();
        if (checkedLinks.has(normalized)) continue;
        checkedLinks.add(normalized);
        try {
          let response = await limitedFetch(normalized, { method: 'HEAD', redirect: 'manual' });
          if (response.status >= 300 && response.status < 400) {
            const location = response.headers.get('location');
            if (!location) { brokenLinks += 1; continue; }
            const redirected = new URL(location, normalized);
            if (!['elevatebranson.org', 'www.elevatebranson.org'].includes(redirected.hostname)) { brokenLinks += 1; continue; }
            response = await limitedFetch(redirected.toString(), { method: 'HEAD', redirect: 'manual' });
          }
          if (!response.ok) brokenLinks += 1;
        }
        catch { brokenLinks += 1; }
      }
    }
  }
  const totalAssetBytes = (await Promise.all(imageFiles.map(async (name) => (await stat(path.join(ASSET_DIR, name))).size))).reduce((a, b) => a + b, 0);
  console.log(JSON.stringify({ pages: manifest.pages.length, images: imageFiles.length, assetBytes: totalAssetBytes, brokenLinks, failedPages: manifest.pages.filter((page) => page.error).length }, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  void (async () => {
    const result = process.argv.includes('--check') ? (await checkImport(), undefined) : await importSite();
    if (result) console.log(`SP-01 done | pages imported: ${result.pages} | images: ${result.images} | conflicts: ${result.conflicts}`);
  })();
}
