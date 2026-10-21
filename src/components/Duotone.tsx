import { View } from 'react-native';

import { tokens } from '@/theme/tokens';

const fill = { bottom: 0, left: 0, position: 'absolute' as const, right: 0, top: 0 };

/** Style for the photo under a duotone: black and white, so the tint layers decide the color. */
export const duotonePhoto = { filter: 'grayscale(1) contrast(1.05)' } as const;

/**
 * Teal duotone: the shadows stay dark teal and the highlights go light teal.
 * `scrim` adds a flat teal layer when text sits on top, so white text keeps 4.5:1.
 */
export function DuotoneLayers({ tint, scrim = 0 }: { tint?: string; scrim?: number }) {
  return (
    <>
      <View pointerEvents="none" style={{ ...fill, backgroundColor: tint ?? tokens.duotone.highlight, mixBlendMode: 'multiply' }} />
      <View pointerEvents="none" style={{ ...fill, backgroundColor: tokens.duotone.shadow, mixBlendMode: 'lighten', opacity: 0.9 }} />
      {scrim > 0 ? <View pointerEvents="none" style={{ ...fill, backgroundColor: tokens.duotone.shadow, opacity: scrim }} /> : null}
    </>
  );
}
