import { Stack } from 'expo-router';

import { stackScreenOptions } from '@/theme/navigation';

export default function EventsLayout() {
  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Screen name="index" options={{ title: 'Events' }} />
      <Stack.Screen name="[id]" options={{ title: 'Event' }} />
    </Stack>
  );
}
