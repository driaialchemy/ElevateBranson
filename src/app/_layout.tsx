import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FormQueueRunner } from '@/forms/FormQueueRunner';
import { NotificationListener } from '@/notifications/NotificationListener';
import { NetworkProvider } from '@/network/NetworkProvider';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <NetworkProvider>
        <FormQueueRunner />
        <NotificationListener />
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </NetworkProvider>
    </SafeAreaProvider>
  );
}
