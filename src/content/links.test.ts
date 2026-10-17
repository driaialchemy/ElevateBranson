import assert from 'node:assert/strict';
import test from 'node:test';

import { callUrl, mapUrl } from './links.ts';

test('phone and address become call and map links', () => {
  assert.equal(callUrl('417.335.9915'), 'tel:4173359915');
  assert.equal(callUrl(''), null);
  assert.match(mapUrl('310 Gretna Road, Branson, MO 65616', 'ios'), /^https:\/\/maps\.apple\.com\/\?q=/);
  assert.match(mapUrl('310 Gretna Road', 'android'), /^https:\/\/www\.google\.com\/maps\/search\//);
});
