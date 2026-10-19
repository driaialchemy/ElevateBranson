import { TextInput } from 'react-native';

export function HoneypotField({ value, onChangeText }: { value: string; onChangeText: (value: string) => void }) {
  return (
    <TextInput
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      onChangeText={onChangeText}
      style={{ height: 0, opacity: 0, position: 'absolute', width: 0 }}
      value={value}
    />
  );
}
