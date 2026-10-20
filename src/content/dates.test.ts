import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { isUpcoming, isValidIsoDate } from './dates.ts';

describe('isUpcoming', () => {
  it('includes today and future dates', () => {
    assert.equal(isUpcoming('2026-10-20', '2026-10-20'), true);
    assert.equal(isUpcoming('2026-10-21', '2026-10-20'), true);
  });
  it('hides past or invalid dates', () => {
    assert.equal(isUpcoming('2026-10-19', '2026-10-20'), false);
    assert.equal(isUpcoming('2026-13-40', '2026-10-20'), false);
    assert.equal(isUpcoming('TBD', '2026-10-20'), false);
  });

  it('accepts only real ISO calendar dates as verification dates', () => {
    assert.equal(isValidIsoDate('2026-02-28'), true);
    assert.equal(isValidIsoDate('2026-02-30'), false);
  });
});
