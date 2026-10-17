import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { tokens } from '@/theme/tokens';

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <View
      accessibilityRole="alert"
      style={{
        backgroundColor: tokens.color.surface,
        borderColor: tokens.color.error,
        borderRadius: tokens.radius,
        borderWidth: 2,
        gap: tokens.space.sm,
        padding: tokens.space.md,
      }}>
      <Text
        style={{
          color: tokens.color.error,
          fontFamily: tokens.font.family.heading,
          fontSize: tokens.font.size.header,
          lineHeight: tokens.font.lineHeight.header,
        }}>
        Something went wrong
      </Text>
      <Text
        style={{
          color: tokens.color.text,
          fontFamily: tokens.font.family.body,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
        }}>
        {message}
      </Text>
      {onRetry ? <Button label="Try again" onPress={onRetry} /> : null}
    </View>
  );
}
