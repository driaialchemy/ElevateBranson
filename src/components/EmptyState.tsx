import { Text, View } from 'react-native';

import { tokens } from '@/theme/tokens';

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <View
      style={{
        backgroundColor: tokens.color.surface,
        borderColor: tokens.color.border,
        borderRadius: tokens.radius,
        borderWidth: 1,
        gap: tokens.space.sm,
        padding: tokens.space.md,
      }}>
      <Text
        style={{
          color: tokens.color.text,
          fontFamily: tokens.font.family.heading,
          fontSize: tokens.font.size.header,
          lineHeight: tokens.font.lineHeight.header,
        }}>
        {title}
      </Text>
      <Text
        style={{
          color: tokens.color.textMuted,
          fontFamily: tokens.font.family.body,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
        }}>
        {body}
      </Text>
    </View>
  );
}
