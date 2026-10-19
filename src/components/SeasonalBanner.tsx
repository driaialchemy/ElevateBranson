import { Image } from 'expo-image';
import { Pressable } from 'react-native';

import { openHref } from '@/components/openLink';
import { brandImage } from '@/content/images';
import type { SeasonalNotice } from '@/content/types';
import { tokens } from '@/theme/tokens';

export function SeasonalBanner({ notice }: { notice?: SeasonalNotice | null }) {
  if (!notice) {
    return null;
  }
  const source = brandImage(notice.imageKey);
  if (!source) {
    return null;
  }
  return (
    <Pressable
      accessibilityLabel={notice.alt}
      accessibilityRole="button"
      onPress={() => openHref(notice.href)}
      style={{ minHeight: tokens.tapTarget }}>
      <Image
        accessibilityLabel={notice.alt}
        cachePolicy="memory-disk"
        contentFit="contain"
        recyclingKey={notice.imageKey}
        source={source}
        style={{ backgroundColor: tokens.color.primary, borderRadius: tokens.radius, height: 88, width: '100%' }}
      />
    </Pressable>
  );
}
