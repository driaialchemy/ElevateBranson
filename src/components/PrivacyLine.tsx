import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { tokens } from '@/theme/tokens';

export function PrivacyLine() {
  return (
    <Link href="/more/privacy" asChild>
      <Pressable
        accessibilityLabel="Privacy notice. We send this only to the Elevate Branson team."
        accessibilityRole="link"
        style={{ justifyContent: 'center', minHeight: tokens.tapTarget }}>
        <Text
          style={{
            color: tokens.color.text,
            fontFamily: tokens.font.family.body,
            fontSize: tokens.font.size.body,
            lineHeight: tokens.font.lineHeight.body,
            textDecorationLine: 'underline',
          }}>
          Privacy notice. We send this only to the Elevate Branson team.
        </Text>
      </Pressable>
    </Link>
  );
}
