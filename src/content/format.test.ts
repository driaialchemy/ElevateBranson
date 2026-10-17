import assert from 'node:assert/strict';
import test from 'node:test';

import { formatDay } from './format.ts';

test('hours read in plain time', () => {
  assert.equal(formatDay({ day: 'monday', opens: '08:00', closes: '15:00' }), 'Monday: 8:00 A.M. – 3:00 P.M.');
  assert.equal(formatDay({ day: 'sunday', opens: null, closes: null }), 'Sunday: Closed');
});
