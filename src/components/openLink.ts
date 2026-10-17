import * as Linking from 'expo-linking';
import { Platform } from 'react-native';

import { callUrl, mapUrl } from '@/content/links';

export function openExternal(url: string) {
  if (!url.trim()) {
    return;
  }
  void Linking.openURL(url);
}

export function openCall(phone: string) {
  const url = callUrl(phone);
  if (url) {
    void Linking.openURL(url);
  }
}

export function openMap(address: string) {
  if (!address.trim()) {
    return;
  }
  const platform = Platform.OS === 'ios' ? 'ios' : Platform.OS === 'android' ? 'android' : 'default';
  void Linking.openURL(mapUrl(address, platform));
}
