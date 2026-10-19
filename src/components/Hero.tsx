import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { openHref } from '@/components/openLink';
import { brandImage } from '@/content/images';
import { tokens } from '@/theme/tokens';

export function Hero({
  imageKey,
  alt,
  title,
  subtitle,
  actionLabel,
  actionHref,
}: {
  imageKey: string;
  alt: string;
  title: string;
  subtitle: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  const source = brandImage(imageKey);
  return (
    <View
      style={{
        borderRadius: tokens.radius,
        marginHorizontal: -tokens.space.md,
        minHeight: 320,
        overflow: 'hidden',
      }}>
      {source ? (
        <Image
          accessibilityLabel={alt}
          cachePolicy="memory-disk"
          contentFit="cover"
          recyclingKey={imageKey}
          source={source}
          style={{ bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 }}
        />
      ) : null}
      <View style={{ backgroundColor: tokens.color.overlay, opacity: 0.82, ...StyleSheetFill }} />
      <View style={{ gap: tokens.space.md, padding: tokens.space.lg }}>
        <Text
          accessibilityRole="header"
          style={{
            color: tokens.color.onPrimary,
            fontFamily: tokens.font.family.heading,
            fontSize: tokens.font.size.hero,
            lineHeight: tokens.font.lineHeight.hero,
            textAlign: 'center',
          }}>
          {title}
        </Text>
        <Text
          style={{
            color: tokens.color.onPrimary,
            fontFamily: tokens.font.family.body,
            fontSize: tokens.font.size.header,
            lineHeight: tokens.font.lineHeight.header,
            textAlign: 'center',
          }}>
          {subtitle}
        </Text>
        {actionLabel && actionHref ? (
          <Button label={actionLabel} onPress={() => openHref(actionHref)} variant="secondary" />
        ) : null}
      </View>
    </View>
  );
}

const StyleSheetFill = { bottom: 0, left: 0, position: 'absolute' as const, right: 0, top: 0 };
