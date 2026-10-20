import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { features, homeQuickActions, tabs } from './map.ts';

describe('navigation map', () => {
  it('lists all 17 features', () => {
    assert.equal(features.length, 17);
    assert.deepEqual(
      features.map((feature) => feature.id),
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    );
  });

  it('keeps every feature within two taps of Home', () => {
    for (const feature of features) {
      assert.ok(feature.tapsFromHome >= 1 && feature.tapsFromHome <= 2, feature.name);
      assert.ok(feature.href.startsWith('/'), feature.href);
    }
  });

  it('uses the five bottom tabs from the prompt', () => {
    assert.deepEqual(
      tabs.map((tab) => tab.label),
      ['Home', 'What We Do', 'Visit', 'Get Involved', 'More'],
    );
  });

  it('puts home shortcuts on real feature routes', () => {
    const hrefs = new Set(features.map((feature) => feature.href));
    for (const action of homeQuickActions) {
      assert.ok(hrefs.has(action.href), action.href);
    }
  });
});
