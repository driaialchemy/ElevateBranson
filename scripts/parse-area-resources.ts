import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export type ParsedResource = {
  id: string;
  name: string;
  category: string;
  summary: string;
  phone: string;
  address: string;
  sourceUrl: string;
  verify: true;
  lastVerified: string;
};

export type ParseOptions = { sourceUrl: string; lastVerified: string; withheldPhones?: string[] };

const phonePattern = /(?:1[.-])?\d{3}[.-]\d{3}[.-]\d{4}/;
const phoneStart = /^(?:1[.-])?\d{3}[.-]\d{3}[.-]\d{4}/;
const streetLike = /^\d+\s+[A-Za-z0-9 .]+\b(Road|Rd|Street|St|Boulevard|Blvd|Drive|Dr|Parkway|Avenue|Ave|Lane|Highway|Hwy)\b/;
const withCity = /\bMO\b/;

function titleCase(value: string): string {
  return value
    .toLowerCase()
    .replace(/(^|[\s(-])([a-z])/g, (_all, lead: string, letter: string) => lead + letter.toUpperCase())
    .replace(/\s*\(continued\)\s*$/i, '')
    .trim();
}

function isHeader(block: string[]): boolean {
  return block.length === 1 && /^[A-Z][A-Z &'’\-0-9]+$/.test(block[0]) && block[0].replace(/[^A-Z]/g, '').length >= 5;
}

function tidy(line: string): string {
  return line.replace(/\b([AP])\s+\.M\./g, '$1.M.').replace(/\s+/g, ' ').trim();
}

function slug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function cleanPhone(raw: string): string {
  return raw.replace(/^1[.-]/, '').replace(/[.-]/g, '-');
}

export function parseAreaResources(text: string, options: ParseOptions): ParsedResource[] {
  const withheld = options.withheldPhones ?? [];
  const result: ParsedResource[] = [];
  const seen = new Set<string>();

  let category = '';
  for (const section of text.split(/^## page .*$/m)) {

    const blocks = section
      .replace(/\r/g, '')
      .split(/\n\s*\n/)
      .map((block) => block.split('\n').map((line) => line.trim()).filter(Boolean))
      .filter((block) => block.length > 0);

    for (const block of blocks) {
      if (isHeader(block)) {
        category = titleCase(block[0]);
        continue;
      }
      const [name, ...rest] = block;
      const phoneStarts = rest.filter((line) => phoneStart.test(line));
      if (!category || phoneStarts.length === 0 || phoneStart.test(name) || !/^[A-Z]/.test(name)) {
        continue;
      }
      const phoneLine = phoneStarts[0];
      const phone = cleanPhone(phoneLine.match(phonePattern)![0]);
      if (withheld.some((blocked) => phoneLine.includes(blocked))) {
        continue;
      }
      // A block with several phone lines may hold more than one listing; keep only the first, using what comes before its phone.
      const before = rest.slice(0, rest.indexOf(phoneLine));
      const after = phoneStarts.length === 1 ? rest.slice(rest.indexOf(phoneLine) + 1) : [];
      const addresses = [...before, ...after].filter((line) => streetLike.test(line));
      const addressLine = addresses.length === 1 && withCity.test(addresses[0]) ? addresses[0] : undefined;
      const notes = [...before, ...after].filter((line) => line !== addressLine).map(tidy);
      const id = `area-${slug(name)}`;
      if (seen.has(id)) {
        continue;
      }
      seen.add(id);
      result.push({
        id,
        name: tidy(name),
        category,
        summary: notes.length > 0 ? notes.join(' ') : 'Listed on the Area Resources sheet.',
        phone,
        address: addressLine ?? '',
        sourceUrl: options.sourceUrl,
        verify: true,
        lastVerified: options.lastVerified,
      });
    }
  }
  return result;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const [input, output] = process.argv.slice(2);
  const entries = parseAreaResources(readFileSync(input, 'utf8'), {
    sourceUrl: 'https://elevatebranson.org/wp-content/uploads/2026/07/Area-Resources-June-2026.pdf',
    lastVerified: '2026-06-01',
    withheldPhones: ['417.239.7818'],
  });
  writeFileSync(output, `${JSON.stringify(entries, null, 2)}\n`, 'utf8');
  console.log(`entries extracted: ${entries.length}`);
}
