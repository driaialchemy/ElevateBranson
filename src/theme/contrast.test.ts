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

  it('keeps white hero text at 4.5:1 over the brightest duotone pixel', () => {
    const channels = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    const [highlight, shadow] = [channels(tokens.duotone.highlight), channels(tokens.duotone.shadow)];
    // A white photo pixel times the highlight tint is the highlight; the shadow layer can only lift it.
    const brightest = highlight.map((value, index) => Math.max(value, shadow[index]));
    const covered = brightest.map((value, index) => Math.round(value * (1 - tokens.duotone.scrim) + shadow[index] * tokens.duotone.scrim));
    const hex = `#${covered.map((value) => value.toString(16).padStart(2, '0')).join('')}`;
    const ratio = contrastRatio(tokens.color.onPrimary, hex);
    assert.ok(ratio >= minimum, `hero text is ${ratio.toFixed(2)} on ${hex}`);
  });
});
