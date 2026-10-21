import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export type Status = 'native route' | 'PageScreen' | 'external fallback' | 'excluded' | 'MISSING';

export type ParityRow = { url: string; status: Status; target: string };

export type ParityInput = {
  /** Website URL -> app route, from the table in docs/NAVIGATION.md. */
  navigation: { url: string; route: string }[];
  /** Imported page slugs (content/pages/*.json). */
  pageSlugs: Set<string>;
  /** Every website URL to account for. */
  urls: string[];
  /** URLs found only as outbound links inside imported pages (individual stories, blog posts, archive pages). */
  linkOnlyUrls?: string[];
  /** Does this app route resolve to a screen file? */
  routeExists: (route: string) => boolean;
  /** Pages with images: slug -> image URLs. */
  images: { slug: string; url: string }[];
  hasImage: (url: string) => boolean;
};

export const exclusions: Record<string, string> = {
  '/forms/13/': 'Returns 404 on the website; the live church partner form is the Neon CRM link.',
  '/forms/30/': 'Returns 404 on the website; no content to import.',
  '/forms--13/': 'Same page as /forms/13/ (404); removed from the app.',
  '/forms--30/': 'Same page as /forms/30/ (404); removed from the app.',
  '/cart/': 'Online store page; the app has no store.',
  '/checkout/': 'Online store page; the app has no store.',
  '/my-account/': 'Website login; the app has no accounts.',
  '/staff-page/': 'Staff-only page; personal contacts stay out of the app.',
  '/crisis-communication-plan/': 'Internal document; not for public display.',
  '/branding-partners/': 'Partner list pending approval; see HUMAN_TASKS.',
  '/thank-you-': 'Form confirmation pages; the app shows its own confirmation.',
  '/feed/': 'Machine feed, not a page.',
  '/wp-json/': 'Machine endpoint, not a page.',
};

export function normalizePath(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!/(^|\.)elevatebranson\.org$/.test(parsed.hostname)) return null;
    const path = parsed.pathname.endsWith('/') || /[.][a-z0-9]{2,5}$/i.test(parsed.pathname) ? parsed.pathname : `${parsed.pathname}/`;
    return path;
  } catch {
    return null;
  }
}

function exclusionFor(path: string): string | undefined {
  const key = Object.keys(exclusions).find((item) => path === item || (item.endsWith('-') && path.startsWith(item)) || path.startsWith(item.replace(/\/$/, '') + '/') && item.endsWith('/') && false);
  return key ? exclusions[key] : undefined;
}

export function buildParity(input: ParityInput) {
  const byPath = new Map(input.navigation.map((row) => [normalizePath(row.url) ?? row.url, row.route]));
  const seen = new Set<string>();
  const rows: ParityRow[] = [];

  for (const url of input.urls) {
    const path = normalizePath(url);
    if (!path || seen.has(path)) continue;
    seen.add(path);
    const full = `https://elevatebranson.org${path}`;
    const reason = exclusionFor(path);
    if (reason) {
      rows.push({ url: full, status: 'excluded', target: reason });
      continue;
    }
    if (path.startsWith('/wp-content/')) {
      rows.push({ url: full, status: 'external fallback', target: 'Opens the file in the in-app browser' });
      continue;
    }
    // Nested website paths are stored with `--` between segments (meet-our-neighbors/2 -> meet-our-neighbors--2).
    const route = byPath.get(path) ?? byPath.get(`/${path.split('/').filter(Boolean).join('--')}/`);
    if (!route) {
      rows.push({ url: full, status: 'MISSING', target: 'No app route and no exclusion' });
    } else if (route.startsWith('/page/')) {
      const slug = route.replace('/page/', '');
      rows.push(input.pageSlugs.has(slug) ? { url: full, status: 'PageScreen', target: route } : { url: full, status: 'MISSING', target: `${route} has no imported page` });
    } else {
      rows.push(input.routeExists(route) ? { url: full, status: 'native route', target: route } : { url: full, status: 'MISSING', target: `${route} has no screen` });
    }
  }

  for (const url of input.linkOnlyUrls ?? []) {
    const path = normalizePath(url);
    if (!path || seen.has(path)) continue;
    seen.add(path);
    rows.push({ url: `https://elevatebranson.org${path}`, status: 'external fallback', target: exclusionFor(path) ? 'Excluded page' : 'Not imported (individual story, post, or archive page); the link opens the website page in the in-app browser' });
  }

  const missingImages = input.images.filter((image) => !input.hasImage(image.url));
  const counts = rows.reduce<Record<string, number>>((all, row) => ({ ...all, [row.status]: (all[row.status] ?? 0) + 1 }), {});
  const covered = rows.filter((row) => row.status !== 'MISSING').length;
  return { rows, counts, covered, total: rows.length, missingImages };
}

export function renderParity(result: ReturnType<typeof buildParity>, date: string): string {
  const lines = [
    '# Parity report',
    '',
    `Generated ${date} by \`npm run audit:parity\`. Every website URL found in the site inventory, the navigation table, and the imported pages is either present in the app or excluded with a reason.`,
    '',
    `**Parity: ${result.covered} of ${result.total}**`,
    '',
    '| Status | Count |',
    '| --- | --- |',
    ...Object.entries(result.counts).map(([status, count]) => `| ${status} | ${count} |`),
    '',
    `Images used by pages but not bundled: ${result.missingImages.length}`,
    '',
  ];
  for (const image of result.missingImages) lines.push(`- \`${image.slug}\`: ${image.url}`);
  lines.push('', '## Pages', '', '| Website URL | Status | App route or reason |', '| --- | --- | --- |');
  for (const row of result.rows) lines.push(`| ${row.url} | ${row.status} | ${row.target.replace(/\|/g, '/')} |`);
  return `${lines.join('\n')}\n`;
}

function routeExistsOnDisk(route: string): boolean {
  const clean = route.split('?')[0].replace(/\/$/, '') || '/index';
  const bases = ['src/app/(tabs)', 'src/app'];
  return bases.some((base) => existsSync(`${base}${clean}.tsx`) || existsSync(`${base}${clean}/index.tsx`) || (clean === '/index' && existsSync(`${base}/index.tsx`)));
}

function main() {
  const navText = readFileSync('docs/NAVIGATION.md', 'utf8');
  const navigation = [...navText.matchAll(/^\| (https:\/\/elevatebranson\.org\S*) \| `([^`]+)` \|/gm)].map((match) => ({ url: match[1], route: match[2] }));
  const pageFiles = readdirSync('content/pages').filter((name) => name.endsWith('.json'));
  const pages = pageFiles.map((name) => JSON.parse(readFileSync(`content/pages/${name}`, 'utf8')) as { slug: string; sourceUrl: string; heroImage?: { url: string }; blocks: { _type: string; images?: { url: string }[]; buttons?: { url: string }[]; url?: string }[] });
  const inventory = readFileSync('docs/SITE_INVENTORY.md', 'utf8');
  const urls = new Set<string>(navigation.map((row) => row.url));
  const linkOnly = new Set<string>();
  for (const match of inventory.matchAll(/https:\/\/elevatebranson\.org[^\s)|,;`>\]]*/g)) urls.add(match[0].replace(/[.]+$/, ''));
  for (const page of pages) {
    urls.add(page.sourceUrl);
    for (const block of page.blocks) {
      for (const button of block.buttons ?? []) linkOnly.add(button.url);
      if (block.url) linkOnly.add(block.url);
    }
  }
  const images = pages.flatMap((page) => [page.heroImage?.url, ...page.blocks.flatMap((block) => (block.images ?? []).map((image) => image.url))].filter((url): url is string => Boolean(url)).map((url) => ({ slug: page.slug, url })));
  const siteImagesText = readFileSync('src/content/siteImages.ts', 'utf8');
  const result = buildParity({
    navigation,
    pageSlugs: new Set(pages.map((page) => page.slug)),
    urls: [...urls],
    linkOnlyUrls: [...linkOnly],
    routeExists: routeExistsOnDisk,
    images,
    hasImage: (url) => siteImagesText.includes(`'${new URL(url, 'https://elevatebranson.org').pathname}'`) || siteImagesText.includes(`"${new URL(url, 'https://elevatebranson.org').pathname}"`),
  });
  writeFileSync('docs/PARITY_REPORT.md', renderParity(result, new Date().toISOString().slice(0, 10)), 'utf8');
  console.log(`parity: ${result.covered} of ${result.total}; missing images: ${result.missingImages.length}`);
  const gaps = result.rows.filter((row) => row.status === 'MISSING');
  for (const gap of gaps) console.log(`MISSING ${gap.url} ${gap.target}`);
  if (gaps.length > 0) process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) main();
