import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, type Href } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { tokens } from '@/theme/tokens';

export function ListRow({
  label,
  detail,
  href,
  icon = 'ellipse-outline',
}: {
  label: string;
  detail?: string;
  href: string;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <Link href={href as Href} asChild>
      <Pressable
        accessibilityLabel={detail ? `${label}. ${detail}` : label}
        accessibilityRole="button"
        style={({ pressed }) => ({
          alignItems: 'center',
          backgroundColor: pressed ? tokens.color.background : tokens.color.surface,
          borderColor: tokens.color.border,
          borderRadius: tokens.radius,
          borderWidth: 1,
          flexDirection: 'row',
          gap: tokens.space.sm,
          maxWidth: '100%',
          minHeight: tokens.tapTarget,
          minWidth: 0,
          paddingHorizontal: tokens.space.md,
          paddingVertical: tokens.space.sm,
        })}>
        <Ionicons accessibilityElementsHidden color={tokens.color.primary} importantForAccessibility="no" name={icon} size={24} />
        <View style={{ flex: 1, gap: tokens.space.xs, minWidth: 0 }}>
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
        <Ionicons accessibilityElementsHidden color={tokens.color.primary} importantForAccessibility="no" name="chevron-forward" size={22} />
      </Pressable>
    </Link>
  );
}
