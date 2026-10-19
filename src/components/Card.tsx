import { Image } from 'expo-image';
import { Link, type Href } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { brandImage } from '@/content/images';
import { tokens } from '@/theme/tokens';

export function Card({
  title,
  body,
  imageKey,
  alt,
  href,
}: {
  title?: string;
  body: string;
  imageKey?: string;
  alt?: string;
  href?: string;
}) {
  const source = brandImage(imageKey);
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

  return (
    <Link href={href as Href} asChild>
      <Pressable accessibilityLabel={title ? `${title}. ${body}` : body} accessibilityRole="button">
        {content}
      </Pressable>
    </Link>
  );
}
