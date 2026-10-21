import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

export type LinkResult = { url: string; status: number | 'error'; note: string; sources: string[] };

/** Sites that refuse automated requests; they are listed but not judged. */
export const botBlockedHosts = ['facebook.com', 'instagram.com', 'x.com', 'twitter.com', 'linkedin.com', 'amazon.com', 'goo.gl'];

const ignoredHosts = ['example.org', 'your-worker.example', 'localhost', 'exp.host', 'api.resend.com', 'schemas.xmlsoap.org', 'w3.org', 'reactjs.org', 'expo.dev', 'docs.expo.dev'];

export function extractUrls(text: string): string[] {
  const found = text.match(/https?:\/\/[^\s"'`)<>\\\]}]+/g) ?? [];
  return found
    .map((url) => url.replace(/[.,;:]+$/, '').replace(/#.*$/, ''))
    .filter((url) => !url.includes('${') && !url.includes('$'))
    .filter((url) => {
      try {
        const host = new URL(url).hostname.replace(/^www\./, '');
        return !ignoredHosts.some((ignored) => host === ignored || host.endsWith(`.${ignored}`));
      } catch {
        return false;
      }
    });
}

export function isBotBlocked(url: string): boolean {
  const host = new URL(url).hostname.replace(/^www\./, '');
  return botBlockedHosts.some((blocked) => host === blocked || host.endsWith(`.${blocked}`));
}

export function isBroken(result: LinkResult): boolean {
  if (isBotBlocked(result.url)) return false;
  return result.status === 'error' || result.status === 404 || result.status === 410 || (typeof result.status === 'number' && result.status >= 500);
}

function walk(dir: string, found: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, found);
    else if (/\.(tsx?|json)$/.test(name) && !/\.test\.ts$/.test(name)) found.push(path);
  }
  return found;
}

async function check(url: string, attempt = 0): Promise<{ status: number | 'error'; note: string }> {
  const result = await checkOnce(url);
  if ((result.status === 'error' || result.status >= 500) && attempt < 2) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return check(url, attempt + 1);
  }
  return result;
}

async function checkOnce(url: string): Promise<{ status: number | 'error'; note: string }> {
  for (const method of ['HEAD', 'GET']) {
    try {
      const response = await fetch(url, { method, redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 ElevateBransonLinkAudit' }, signal: AbortSignal.timeout(20000) });
      if (method === 'HEAD' && (response.status >= 400 || response.status === 0)) continue;
      const moved = response.url && response.url !== url ? `redirects to ${response.url}` : '';
      return { status: response.status, note: moved };
    } catch (error) {
      if (method === 'GET') return { status: 'error', note: error instanceof Error ? error.name : 'failed' };
    }
  }
  return { status: 'error', note: 'failed' };
}

export function renderLinks(results: LinkResult[], date: string): string {
  const broken = results.filter(isBroken);
  const blocked = results.filter((result) => isBotBlocked(result.url));
  const lines = [
    '# Link report',
    '',
    `Generated ${date} by \`npm run audit:links\`. Every external URL in \`src\` and the imported pages was requested once.`,
    '',
    `**Checked: ${results.length} | broken: ${broken.length} | not judged (sites that block bots): ${blocked.length}**`,
    '',
  ];
  if (broken.length > 0) {
    lines.push('## Broken', '', '| URL | Status | Where |', '| --- | --- | --- |');
    for (const result of broken) lines.push(`| ${result.url} | ${result.status} | ${result.sources.slice(0, 3).join(', ')} |`);
    lines.push('');
  }
  lines.push('## All links', '', '| URL | Status | Note |', '| --- | --- | --- |');
  for (const result of results) lines.push(`| ${result.url} | ${result.status} | ${isBotBlocked(result.url) ? 'blocks bots; check by hand' : result.note.replace(/\|/g, '/')} |`);
  return `${lines.join('\n')}\n`;
}

async function main() {
  const sources = new Map<string, string[]>();
  for (const file of [...walk('src'), ...walk('content/pages')]) {
    for (const url of extractUrls(readFileSync(file, 'utf8'))) sources.set(url, [...(sources.get(url) ?? []), file.replace(/\\/g, '/')]);
  }
  const urls = [...sources.keys()].sort();
  const results: LinkResult[] = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: 5 }, async () => {
      while (next < urls.length) {
        const url = urls[next++];
        const { status, note } = await check(url);
        results.push({ url, status, note, sources: sources.get(url) ?? [] });
      }
    }),
  );
  results.sort((a, b) => a.url.localeCompare(b.url));
  writeFileSync('docs/LINK_REPORT.md', renderLinks(results, new Date().toISOString().slice(0, 10)), 'utf8');
  const broken = results.filter(isBroken);
  console.log(`links: ${results.length} checked, ${broken.length} broken`);
  for (const result of broken) console.log(`BROKEN ${result.status} ${result.url} (${result.sources[0]})`);
  if (broken.length > 0) process.exitCode = 1;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) void main();
