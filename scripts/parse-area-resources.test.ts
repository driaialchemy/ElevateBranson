import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { parseAreaResources } from './parse-area-resources.ts';

const sample = readFileSync(new URL('./fixtures/area-resources-columns.txt', import.meta.url), 'utf8');
const entries = parseAreaResources(sample, {
  sourceUrl: 'https://example.org/sheet.pdf',
  lastVerified: '2026-06-01',
  withheldPhones: ['417.239.7818'],
});

test('extracts named entries with phones from the saved sheet', () => {
  assert.ok(entries.length >= 50);
  const branson = entries.find((entry) => entry.name === 'Branson Senior Center' || entry.name === 'Elevate Kids');
  assert.ok(branson);
  assert.equal(entries.find((entry) => entry.name === 'Elevate Kids')?.phone, '417-243-0644');
  assert.equal(entries.find((entry) => entry.name === 'Poison Control')?.category, 'Emergency Services');
});

test('every entry is marked verify with the sheet date, a name, a category, and a phone', () => {
  for (const entry of entries) {
    assert.equal(entry.verify, true);
    assert.equal(entry.lastVerified, '2026-06-01');
    assert.ok(entry.name.length > 2 && entry.category.length > 2);
    assert.match(entry.phone, /^\d{3}-\d{3}-\d{4}$/);
  }
});

test('ids are unique, section headers are not entries, and withheld or personal data is left out', () => {
  assert.equal(new Set(entries.map((entry) => entry.id)).size, entries.length);
  assert.equal(entries.some((entry) => /^[A-Z &]+$/.test(entry.name) && entry.name.length > 8), false);
  const text = JSON.stringify(entries);
  assert.equal(text.includes('239-7818'), false);
  assert.equal(text.includes('Noel Corbin'), false);
});

test('addresses are kept only when one clear address with a state is present', () => {
  const stone = entries.find((entry) => entry.name === 'Stone County Recovery Center');
  assert.equal(stone?.address, '150 Keystone Road, Reeds Springs, MO');
  assert.equal(entries.find((entry) => entry.name === 'HOPE Counseling')?.address, '');
});
