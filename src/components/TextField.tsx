import { Text, TextInput, View } from 'react-native';

import { tokens } from '@/theme/tokens';

export function TextField({
  label,
  value,
  onChangeText,
  error,
  multiline = false,
  keyboardType = 'default',
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  multiline?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'number-pad';
}) {
  return (
    <View style={{ gap: tokens.space.xs }}>
      <Text
        style={{
          color: tokens.color.text,
          fontFamily: tokens.font.family.body,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
        }}>
        {label}
      </Text>
      <TextInput
        accessibilityLabel={label}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
        keyboardType={keyboardType}
        multiline={multiline}
        onChangeText={onChangeText}
        style={{
          backgroundColor: tokens.color.surface,
          borderColor: error ? tokens.color.error : tokens.color.border,
          borderRadius: tokens.radius,
          borderWidth: 1,
          color: tokens.color.text,
          fontFamily: tokens.font.family.body,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
          minHeight: multiline ? 120 : tokens.tapTarget,
          paddingHorizontal: tokens.space.md,
          paddingVertical: tokens.space.sm,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
        value={value}
      />
      {error ? (
        <Text
          accessibilityRole="alert"
          style={{
            color: tokens.color.error,
            fontFamily: tokens.font.family.body,
            fontSize: tokens.font.size.body,
            lineHeight: tokens.font.lineHeight.body,
          }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}
