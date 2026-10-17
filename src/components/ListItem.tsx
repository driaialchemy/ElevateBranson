import { Link, type Href } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { tokens } from '@/theme/tokens';

export function ListItem({
  label,
  detail,
  href,
}: {
  label: string;
  detail?: string;
  href: string;
}) {
  return (
    <Link href={href as Href} asChild>
      <Pressable
        accessibilityLabel={detail ? `${label}. ${detail}` : label}
        accessibilityRole="button"
        style={({ pressed }) => ({
          backgroundColor: pressed ? tokens.color.background : tokens.color.surface,
          borderColor: tokens.color.border,
          borderRadius: tokens.radius,
          borderWidth: 1,
          justifyContent: 'center',
          minHeight: tokens.tapTarget,
          paddingHorizontal: tokens.space.md,
          paddingVertical: tokens.space.sm,
        })}>
        <View style={{ gap: tokens.space.xs }}>
          <Text
            style={{
              color: tokens.color.text,
              fontFamily: tokens.font.family.heading,
              fontSize: tokens.font.size.body,
              lineHeight: tokens.font.lineHeight.body,
            }}>
            {label}
          </Text>
          {detail ? (
            <Text
              style={{
                color: tokens.color.textMuted,
                fontFamily: tokens.font.family.body,
                fontSize: tokens.font.size.body,
                lineHeight: tokens.font.lineHeight.body,
              }}>
              {detail}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </Link>
  );
}
