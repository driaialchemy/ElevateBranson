import assert from 'node:assert/strict';
import test from 'node:test';

import { showDonateButton } from '../components/headerRules.ts';
import { freshnessNote } from './freshness.ts';
import { giveOptions } from './giving.ts';
import { loadPdfLanguage, type KeyValueStore, pdfSheets, savePdfLanguage, sheetMonth } from './pdfSheets.ts';

function memoryStore(): KeyValueStore & { fail?: boolean } {
  const data = new Map<string, string>();
  const store: KeyValueStore & { fail?: boolean } = {
    async getItem(key) {
      if (store.fail) throw new Error('storage down');
      return data.get(key) ?? null;
    },
    async setItem(key, value) {
      if (store.fail) throw new Error('storage down');
      data.set(key, value);
    },
  };
  return store;
}

test('language choice defaults to English and persists', async () => {
  const store = memoryStore();
  assert.equal(await loadPdfLanguage(store), 'en');
  await savePdfLanguage(store, 'es');
  assert.equal(await loadPdfLanguage(store), 'es');
  await savePdfLanguage(store, 'en');
  assert.equal(await loadPdfLanguage(store), 'en');
});

test('broken storage falls back to English without throwing', async () => {
  const store = memoryStore();
  store.fail = true;
  assert.equal(await loadPdfLanguage(store), 'en');
  await savePdfLanguage(store, 'es');
});

test('each sheet has English and Spanish PDF links, a month, and a stale-note once old', () => {
  assert.equal(pdfSheets.length, 2);
  for (const sheet of pdfSheets) {
    assert.match(sheet.urls.en, /^https:\/\/elevatebranson\.org\/wp-content\/uploads\/.*\.pdf$/);
    assert.match(sheet.urls.es, /Spanish.*\.pdf$/);
    assert.match(freshnessNote(sheet.lastVerified, new Date('2026-10-20')), /Call to confirm/);
  }
  assert.equal(sheetMonth('2026-06-01'), 'June 2026');
});

test('DONATE NOW shows on every screen except Give', () => {
  for (const path of ['/', '/programs', '/visit', '/events', '/more', '/more/resources', '/get-involved', '/get-involved/volunteer', '/page/rewards-program']) {
    assert.equal(showDonateButton(path), true, path);
  }
  assert.equal(showDonateButton('/get-involved/give'), false);
  assert.equal(showDonateButton('/get-involved/give/'), false);
});

test('give options are hosted forms with no placeholders', () => {
  assert.ok(giveOptions.length >= 8);
  for (const option of giveOptions) {
    assert.match(option.url, /^https:\/\/elevatebranson\.(z2systems|app\.neoncrm)\.com\//);
    assert.equal(/todo/i.test(option.url), false);
  }
  assert.equal(new Set(giveOptions.map((option) => option.id)).size, giveOptions.length);
});
