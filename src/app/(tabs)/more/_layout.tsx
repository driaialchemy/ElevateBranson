import { Stack } from 'expo-router';

import { stackScreenOptions } from '@/theme/navigation';

export default function MoreLayout() {
  return (
    <Stack screenOptions={stackScreenOptions}>
      <Stack.Screen name="index" options={{ title: 'More' }} />
      <Stack.Screen name="about" options={{ title: 'About Us' }} />
      <Stack.Screen name="find-us" options={{ title: 'Find Us' }} />
      <Stack.Screen name="contact" options={{ title: 'Contact' }} />
      <Stack.Screen name="media" options={{ title: 'Media' }} />
      <Stack.Screen name="neighbors" options={{ title: 'Meet Our Neighbors' }} />
      <Stack.Screen name="resources" options={{ title: 'Resources' }} />
      <Stack.Screen name="social" options={{ title: 'Social links' }} />
      <Stack.Screen name="website" options={{ title: 'Website' }} />
      <Stack.Screen name="newsletter" options={{ title: 'Newsletter' }} />
      <Stack.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Stack.Screen name="merch" options={{ title: 'Merch' }} />
      <Stack.Screen name="privacy" options={{ title: 'Privacy' }} />
    </Stack>
  );
}
