import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { brandImage } from '@/content/images';
import { siteImage } from '@/content/siteImages';
import { openHref } from '@/components/openLink';
import { tokens } from '@/theme/tokens';

export function Card({
  title,
  body,
  imageKey,
  imageUrl,
  alt,
  href,
}: {
  title?: string;
  body: string;
  imageKey?: string;
  imageUrl?: string;
  alt?: string;
  href?: string;
}) {
  const source = (imageUrl ? siteImage(imageUrl) : undefined) ?? brandImage(imageKey);
  const content = (
    <View
      style={{
        backgroundColor: tokens.color.surface,
        borderColor: tokens.color.border,
        borderLeftColor: tokens.color.green,
        borderLeftWidth: 6,
        borderRadius: tokens.radius,
        borderWidth: 1,
        elevation: 2,
        gap: tokens.space.sm,
        maxWidth: '100%',
        minWidth: 0,
        overflow: 'hidden',
        padding: tokens.space.md,
        shadowColor: tokens.shadow.color,
        shadowOffset: { height: tokens.shadow.offsetY, width: 0 },
        shadowOpacity: tokens.shadow.opacity,
        shadowRadius: tokens.shadow.radius,
      }}>
      {source ? (
        <Image
          accessibilityLabel={alt || title || 'Photo'}
          cachePolicy="memory-disk"
          contentFit="cover"
          recyclingKey={imageKey}
          source={source}
          style={{ borderRadius: tokens.buttonRadius, height: 160, width: '100%' }}
        />
      ) : null}
      {title ? (
        <Text
          style={{
            color: tokens.color.text,
            fontFamily: tokens.font.family.heading,
            fontSize: tokens.font.size.header,
            lineHeight: tokens.font.lineHeight.header,
          }}>
          {title}
        </Text>
      ) : null}
      <Text
        style={{
          color: tokens.color.text,
          fontFamily: tokens.font.family.body,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
        }}>
        {body}
      </Text>
    </View>
  );

  if (!href) {
    return content;
  }

  return <Pressable accessibilityLabel={title ? `${title}. ${body}` : body} accessibilityRole="button" onPress={() => openHref(href)}>{content}</Pressable>;
}
