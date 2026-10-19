import { Image } from 'expo-image';

import { brandImage } from '@/content/images';
import { tokens } from '@/theme/tokens';

export function BrandImage({
  imageKey,
  alt,
  height = 180,
}: {
  imageKey?: string;
  alt: string;
  height?: number;
}) {
  const source = brandImage(imageKey);
  if (!source) {
    return null;
  }
  return (
    <Image
      accessibilityLabel={alt}
      cachePolicy="memory-disk"
      contentFit="cover"
      recyclingKey={imageKey}
      source={source}
      style={{ borderRadius: tokens.radius, height, width: '100%' }}
    />
  );
}
