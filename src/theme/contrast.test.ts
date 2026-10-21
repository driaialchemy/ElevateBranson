import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { contrastRatio } from './contrast.ts';
import { tokens } from './tokens.ts';

const minimum = 4.5;

describe('text contrast', () => {
  it('meets 4.5:1 for text on the surfaces people read', () => {
    const pairs: [string, string, string][] = [
      ['text on background', tokens.color.text, tokens.color.background],
      ['text on surface', tokens.color.text, tokens.color.surface],
      ['muted on surface', tokens.color.textMuted, tokens.color.surface],
      ['button label', tokens.color.onPrimary, tokens.color.primary],
      ['donate button', tokens.color.onPrimary, tokens.color.donate],
      ['error on surface', tokens.color.error, tokens.color.surface],
      ['offline banner', tokens.color.onPrimary, tokens.color.primary],
    ];

    for (const [name, foreground, background] of pairs) {
      const ratio = contrastRatio(foreground, background);
      assert.ok(ratio >= minimum, `${name} is ${ratio.toFixed(2)}`);
    }
  });

  it('keeps body text at least 16', () => {
    assert.ok(tokens.font.size.body >= 16);
    assert.ok(tokens.font.size.header >= 16);
    assert.ok(tokens.font.size.title >= 16);
    assert.equal(tokens.tapTarget, 44);
  });
});
