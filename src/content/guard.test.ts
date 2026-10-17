import assert from 'node:assert/strict';
import test from 'node:test';

import { cmsIsConfigured } from './guard.ts';

test('a placeholder project id does not count as a live editing site', () => {
  assert.equal(cmsIsConfigured(undefined), false);
  assert.equal(cmsIsConfigured(''), false);
  assert.equal(cmsIsConfigured('your_project_id'), false);
  assert.equal(cmsIsConfigured('abc123'), true);
});
