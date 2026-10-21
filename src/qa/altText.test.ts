import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return files(path);
    return path.endsWith('.tsx') ? [path] : [];
  });
}

/** Returns the props text of each `<Tag ...>` opening, skipping `=>` and braces inside prop values. */
function openings(source: string, tag: string): { props: string; line: number }[] {
  const found: { props: string; line: number }[] = [];
  const start = new RegExp(`<${tag}(?=[\\s/>])`, 'g');
  for (let match = start.exec(source); match; match = start.exec(source)) {
    let depth = 0;
    let index = match.index + match[0].length;
    const begin = index;
    for (; index < source.length; index += 1) {
      const char = source[index];
      if (char === '{') depth += 1;
      else if (char === '}') depth -= 1;
      else if (char === '>' && depth === 0 && source[index - 1] !== '=') break;
    }
    found.push({ props: source.slice(begin, index), line: source.slice(0, match.index).split('\n').length });
  }
  return found;
}

const labelled = /\b(accessibilityLabel|accessibilityLabelledBy|aria-label|alt)=/;
const hidden = /aria-hidden/;

test('every image has alt text or an accessibility label', () => {
  const missing: string[] = [];
  for (const file of files(root)) {
    const source = readFileSync(file, 'utf8');
    for (const tag of ['Image', 'BrandImage', 'ImageBackground']) {
      for (const { props, line } of openings(source, tag)) {
        if (!labelled.test(props) && !hidden.test(props)) {
          missing.push(`${file.replace(root, 'src/')}:${line} <${tag}>`);
        }
      }
    }
  }
  assert.deepEqual(missing, []);
});

test('every pressable, switch, and text field has a screen-reader label', () => {
  const missing: string[] = [];
  for (const file of files(root)) {
    const source = readFileSync(file, 'utf8');
    for (const tag of ['Pressable', 'Switch', 'TouchableOpacity']) {
      for (const { props, line } of openings(source, tag)) {
        if (!labelled.test(props)) missing.push(`${file.replace(root, 'src/')}:${line} <${tag}>`);
      }
    }
    for (const { props, line } of openings(source, 'TextInput')) {
      if (!labelled.test(props) && !hidden.test(props)) missing.push(`${file.replace(root, 'src/')}:${line} <TextInput>`);
    }
  }
  assert.deepEqual(missing, []);
});

test('the scanner flags an image without a label', () => {
  assert.equal(openings('<Image source={x} style={{ a: 1 }} />', 'Image').filter(({ props }) => !labelled.test(props)).length, 1);
  assert.equal(openings('<Image accessibilityLabel="Logo" onPress={() => go()} />', 'Image').filter(({ props }) => !labelled.test(props)).length, 0);
});
