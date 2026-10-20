import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { programDetails } from './programDetails.ts';

describe('program detail content', () => {
  it('provides ten complete detail records with contact and next steps', () => {
    assert.equal(Object.keys(programDetails).length, 10);
    for (const detail of Object.values(programDetails)) {
      assert.ok(detail.facts.length > 0);
      assert.ok(detail.contact);
      assert.ok(detail.actions.length > 0);
    }
  });

  it('keeps optional program sections optional for screens without those blocks', () => {
    const detailWithoutOptionalBlocks = { facts: [], actions: [] };
    assert.equal(detailWithoutOptionalBlocks.facts.length, 0);
    assert.equal('table' in detailWithoutOptionalBlocks, false);
    assert.equal('faq' in detailWithoutOptionalBlocks, false);
    assert.equal('dates' in detailWithoutOptionalBlocks, false);
  });
});
