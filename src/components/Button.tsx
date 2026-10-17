import { Pressable, Text } from 'react-native';

import { tokens } from '@/theme/tokens';

export function Button({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: 'center',
        backgroundColor: pressed ? tokens.color.text : tokens.color.primary,
        borderRadius: tokens.radius,
        justifyContent: 'center',
        minHeight: tokens.tapTarget,
        paddingHorizontal: tokens.space.md,
        paddingVertical: tokens.space.sm,
      })}>
      <Text
        style={{
          color: tokens.color.onPrimary,
          fontFamily: tokens.font.family.body,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
        }}>
        {label}
      </Text>
    </Pressable>
  );
}
