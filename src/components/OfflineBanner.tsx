import { Text, View } from 'react-native';

import { useNetwork } from '@/network/NetworkProvider';
import { tokens } from '@/theme/tokens';

export function OfflineBanner() {
  const { online } = useNetwork();

  if (online) {
    return null;
  }

  return (
    <View
      accessibilityRole="alert"
      style={{
        backgroundColor: tokens.color.primary,
        paddingHorizontal: tokens.space.md,
        paddingVertical: tokens.space.sm,
      }}>
      <Text
        style={{
          color: tokens.color.onPrimary,
          fontFamily: tokens.font.family.body,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
        }}>
        Offline. Saved information is shown below.
      </Text>
    </View>
  );
}
