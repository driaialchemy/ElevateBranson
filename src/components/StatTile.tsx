import { Text, View } from 'react-native';

import { tokens } from '@/theme/tokens';

export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <View
      style={{
        backgroundColor: tokens.color.surface,
        borderColor: tokens.color.border,
        borderRadius: tokens.radius,
        borderTopColor: tokens.color.sky,
        borderTopWidth: 4,
        flex: 1,
        gap: tokens.space.xs,
        minHeight: tokens.tapTarget,
        minWidth: 0,
        padding: tokens.space.sm,
      }}>
      <Text
        style={{
          color: tokens.color.primary,
          fontFamily: tokens.font.family.heading,
          fontSize: tokens.font.size.title,
          lineHeight: tokens.font.lineHeight.title,
        }}>
        {value}
      </Text>
      <Text
        style={{
          color: tokens.color.text,
          fontFamily: tokens.font.family.body,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
        }}>
        {label}
      </Text>
    </View>
  );
}
