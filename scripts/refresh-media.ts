import { writeFile } from 'node:fs/promises';
import { fixtures } from '../src/content/fixtures';
import { importedPages } from '../src/content/sitePages';

const origin = 'https://elevatebranson.org';
const newsletterUrl = `${origin}/news/`;
const podcastUrl = `${origin}/podcast/`;
const videosUrl = `${origin}/videos/`;

async function page(url: string): Promise<string> {
  const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

function latestNews(html: string) {
  const found = new Map<string, (typeof fixtures.newsletters)[number]>();
  for (const match of html.matchAll(/<a\b[^>]*href=["'](https:\/\/conta\.cc\/[\w-]+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const url = match[1] ?? '';
    const text = strip(match[2] ?? '');
    const old = fixtures.newsletters.find((issue) => issue.url === url);
    const title = /newsletter/i.test(text) ? text : old?.title;
    if (!title) continue;
    const month = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d{2})\b/i.exec(title);
    if (!month) continue;
    const monthIndex = new Date(`${month[1]} 1, ${month[2]}`).getMonth() + 1;
    found.set(url, { id: `newsletter-${month[2]}-${String(monthIndex).padStart(2, '0')}`, title, publishedOn: old?.publishedOn ?? `${month[2]}-${String(monthIndex).padStart(2, '0')}-01`, url, sourceUrl: newsletterUrl, verify: true });
  }
  for (const issue of fixtures.newsletters) found.set(issue.url, issue);
  return [...found.values()].sort((a, b) => b.publishedOn.localeCompare(a.publishedOn));
}

function strip(value: string): string {
  return value.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&#8217;|&rsquo;/g, '’').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

async function episode(id: string) {
  const url = `https://open.spotify.com/episode/${id}`;
  const metadata = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`, { signal: AbortSignal.timeout(10_000) });
  if (!metadata.ok) throw new Error(`Spotify episode metadata returned ${metadata.status}`);
  const data = await metadata.json() as { title?: string };
  let publishedOn: string | undefined;
  try {
    const html = await page(url);
    const release = /(?:release_date|datePublished)["']?\s+content=["'](\d{4}-\d{2}-\d{2})/i.exec(html)?.[1];
    if (release) publishedOn = release;
  } catch { /* Titles remain useful if Spotify's page date is unavailable. */ }
  return { id, title: data.title || 'In Pursuit Of Community episode', ...(publishedOn ? { publishedOn } : {}), url, sourceUrl: podcastUrl, status: 'verify' as const };
}

async function main() {
  const [newsHtml, podcastHtml] = await Promise.all([page(newsletterUrl), page(podcastUrl)]);
  const ids = [...new Set([...podcastHtml.matchAll(/open\.spotify\.com\/embed\/episode\/([A-Za-z0-9]+)/g)].map((match) => match[1]!).filter(Boolean))];
  const episodes = [];
  for (let start = 0; start < ids.length; start += 5) {
    episodes.push(...await Promise.all(ids.slice(start, start + 5).map(episode)));
  }
  const videoPage = importedPages.find((item) => item.slug === 'videos');
  const videoGallery = videoPage?.blocks.find((block) => block._type === 'imageGallery');
  const videos = videoGallery?._type === 'imageGallery' ? videoGallery.images.map((item, index) => ({ id: `elevate-video-${index + 1}`, title: item.alt === 'Youtube Video' ? 'Video' : item.alt, url: videosUrl, sourceUrl: videosUrl, status: 'verify' as const })) : [];
  const catalog = { newsletters: latestNews(newsHtml), episodes: episodes.sort((a, b) => (b.publishedOn ?? '').localeCompare(a.publishedOn ?? '')), videos };
  await writeFile(new URL('../src/content/mediaCatalog.json', import.meta.url), `${JSON.stringify(catalog)}\n`);
  process.stdout.write(`Refreshed ${catalog.newsletters.length} newsletters, ${catalog.episodes.length} podcast episodes, and ${catalog.videos.length} video links.\n`);
}

main().catch((error: unknown) => {
  process.stderr.write(`Media refresh failed: ${error instanceof Error ? error.message : 'unknown error'}\n`);
  process.exitCode = 1;
});
