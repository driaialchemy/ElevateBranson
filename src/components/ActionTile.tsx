import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text } from 'react-native';

import { openHref } from '@/components/openLink';
import { tokens } from '@/theme/tokens';

export function ActionTile({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={() => openHref(href)}
      style={({ pressed }) => ({
        alignItems: 'center',
        backgroundColor: pressed ? tokens.color.background : tokens.color.surface,
        borderColor: tokens.color.border,
        borderRadius: tokens.radius,
        borderWidth: 1,
        flexGrow: 1,
        gap: tokens.space.xs,
        justifyContent: 'center',
        minHeight: tokens.tapTarget * 2,
        minWidth: '46%',
        padding: tokens.space.sm,
      })}>
      <Ionicons color={tokens.color.primary} name={icon} size={28} />
      <Text
        style={{
          color: tokens.color.text,
          fontFamily: tokens.font.family.heading,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
          textAlign: 'center',
        }}>
        {label}
      </Text>
    </Pressable>
  );
}
