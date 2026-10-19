import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';

import { features } from '../navigation/map.ts';

const root = join(import.meta.dirname, '..', '..');

const featureFiles: Record<number, string> = {
  1: 'src/app/(tabs)/more/about.tsx',
  2: 'src/app/(tabs)/more/find-us.tsx',
  3: 'src/app/(tabs)/get-involved/volunteer.tsx',
  4: 'src/app/(tabs)/more/resources.tsx',
  5: 'src/app/(tabs)/more/social.tsx',
  6: 'src/app/(tabs)/get-involved/prayer.tsx',
  7: 'src/app/(tabs)/get-involved/merch.tsx',
  8: 'src/app/(tabs)/get-involved/tour.tsx',
  9: 'src/app/(tabs)/programs/tiny-house.tsx',
  10: 'src/app/(tabs)/more/newsletter.tsx',
  11: 'src/app/(tabs)/more/website.tsx',
  12: 'src/app/(tabs)/events/index.tsx',
  13: 'src/app/(tabs)/programs/index.tsx',
  14: 'src/app/(tabs)/programs/thrift.tsx',
  15: 'src/app/(tabs)/programs/coffee.tsx',
  16: 'src/app/(tabs)/get-involved/give.tsx',
  17: 'src/app/(tabs)/programs/playground.tsx',
};

test('each of the 17 features has a screen', () => {
  assert.equal(features.length, 17);
  for (const feature of features) {
    const file = featureFiles[feature.id];
    assert.ok(file, `missing file for ${feature.name}`);
    assert.equal(statSync(join(root, file)).isFile(), true, file);
  }
});

test('screens keep colors in the token file and text at least 16', () => {
  const hexColor = new RegExp('#' + '[0-9A-Fa-f]{3,8}');
  const files = walk(join(root, 'src')).filter(
    (file) => /\.(ts|tsx)$/.test(file) && !file.endsWith('tokens.ts') && !file.endsWith('.test.ts'),
  );
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    assert.equal(hexColor.test(source), false, file);
    assert.equal(source.includes('allowFontScaling={false}'), false, file);
    const sizes = source.matchAll(/fontSize:\s*(\d+)/g);
    for (const match of sizes) {
      assert.ok(Number(match[1]) >= 16, `${file} uses ${match[1]}`);
    }
  }
});

function walk(dir: string): string[] {
  const found: string[] = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      found.push(...walk(path));
    } else {
      found.push(path);
    }
  }
  return found;
}
