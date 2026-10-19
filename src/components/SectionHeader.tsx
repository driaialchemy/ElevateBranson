import { Text } from 'react-native';

import { tokens } from '@/theme/tokens';

export function SectionHeader({ label, onDark = false }: { label: string; onDark?: boolean }) {
  return (
    <Text
      accessibilityRole="header"
      style={{
        color: onDark ? tokens.color.onPrimary : tokens.color.primary,
        fontFamily: tokens.font.family.heading,
        fontSize: tokens.font.size.header,
        letterSpacing: 1,
        lineHeight: tokens.font.lineHeight.header,
        textTransform: 'uppercase',
      }}>
      {label}
    </Text>
  );
}
