import { Montserrat_600SemiBold } from '@expo-google-fonts/montserrat';
import { NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { FormQueueRunner } from '@/forms/FormQueueRunner';
import { NotificationListener } from '@/notifications/NotificationListener';
import { NetworkProvider } from '@/network/NetworkProvider';

export default function RootLayout() {
  const [loaded] = useFonts({
    Montserrat_600SemiBold,
    NunitoSans_400Regular,
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ flex: 1, maxWidth: '100%', minWidth: 0, width: '100%' }}>
      <NetworkProvider>
        <FormQueueRunner />
        <NotificationListener />
        <StatusBar style="dark" />
        <View style={{ flex: 1 }}>
          <Header donateHref="/get-involved/give" donateLabel="DONATE NOW" />
          <Stack screenOptions={{ headerShown: false }} />
        </View>
      </NetworkProvider>
    </SafeAreaProvider>
  );
}
