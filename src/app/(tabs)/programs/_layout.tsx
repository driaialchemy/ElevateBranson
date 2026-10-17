import { Stack } from 'expo-router';

import { stackScreenOptions } from '@/theme/navigation';

export default function ProgramsLayout() {
  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Screen name="index" options={{ title: 'Programs' }} />
      <Stack.Screen name="thrift" options={{ title: 'Thrift Store' }} />
      <Stack.Screen name="coffee" options={{ title: 'Elevate Coffee' }} />
      <Stack.Screen name="playground" options={{ title: 'Playground' }} />
      <Stack.Screen name="tiny-house" options={{ title: 'Tiny House' }} />
      <Stack.Screen name="[slug]" options={{ title: 'Program' }} />
    </Stack>
  );
}
