import { Stack } from 'expo-router';

import { stackScreenOptions } from '@/theme/navigation';

export default function GetInvolvedLayout() {
  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Screen name="index" options={{ title: 'Get Involved' }} />
      <Stack.Screen name="volunteer" options={{ title: 'Volunteer' }} />
      <Stack.Screen name="tour" options={{ title: 'Schedule a tour' }} />
      <Stack.Screen name="volunteer-native" options={{ title: 'Volunteer' }} />
      <Stack.Screen name="tour-native" options={{ title: 'Request a tour' }} />
      <Stack.Screen name="prayer" options={{ title: 'Prayer request' }} />
      <Stack.Screen name="give" options={{ title: 'Give' }} />
      <Stack.Screen name="merch" options={{ title: 'Merch' }} />
    </Stack>
  );
}
