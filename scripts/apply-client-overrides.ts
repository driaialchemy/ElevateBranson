import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { applyClientOverrides } from '../src/content/clientOverrides';
import type { Page } from '../src/content/types';

export async function applyStoredOverrides(directory: string): Promise<{ updated: string[]; removed: string[] }> {
  const updated: string[] = [];
  const removed: string[] = [];
  const files = (await readdir(directory)).filter((name) => name.endsWith('.json'));
  for (const file of files) {
    const full = path.join(directory, file);
    const page = JSON.parse(await readFile(full, 'utf8')) as Page;
    const next = applyClientOverrides(page);
    if (!next) {
      await rm(full, { force: true });
      removed.push(page.slug);
      continue;
    }
    if (JSON.stringify(next) === JSON.stringify(page)) continue;
    await writeFile(full, `${JSON.stringify(next, null, 2)}\n`);
    updated.push(page.slug);
  }
  return { updated, removed };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  void applyStoredOverrides(path.join(process.cwd(), 'content', 'pages')).then((result) => {
    console.log(JSON.stringify(result));
  });
}
