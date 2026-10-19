import { Pressable, Text } from 'react-native';

import { tokens } from '@/theme/tokens';

type Variant = 'primary' | 'secondary' | 'donate';

export function Button({
  label,
  onPress,
  variant = 'primary',
}: {
  label: string;
  onPress: () => void;
  variant?: Variant;
}) {
  const secondary = variant === 'secondary';
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        alignItems: 'center',
        backgroundColor: secondary ? tokens.color.surface : pressed ? tokens.color.text : tokens.color.primary,
        borderColor: tokens.color.primary,
        borderRadius: tokens.buttonRadius,
        borderWidth: 2,
        elevation: 2,
        justifyContent: 'center',
        minHeight: tokens.tapTarget,
        paddingHorizontal: tokens.space.lg,
        paddingVertical: tokens.space.sm,
        shadowColor: tokens.shadow.color,
        shadowOffset: { height: tokens.shadow.offsetY, width: 0 },
        shadowOpacity: tokens.shadow.opacity,
        shadowRadius: tokens.shadow.radius,
      })}>
      <Text
        style={{
          color: secondary ? tokens.color.primary : tokens.color.onPrimary,
          fontFamily: tokens.font.family.heading,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
          maxWidth: '100%',
          textAlign: 'center',
        }}>
        {label}
      </Text>
    </Pressable>
  );
}
