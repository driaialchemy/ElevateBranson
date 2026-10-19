import * as Linking from 'expo-linking';
import { type Href, router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import { callUrl, isBrowserLink, mapUrl } from '@/content/links';

export function openExternal(url: string) {
  const trimmed = url.trim();
  if (!trimmed) {
    return;
  }
  if (isBrowserLink(trimmed)) {
    void WebBrowser.openBrowserAsync(trimmed);
    return;
  }
  void Linking.openURL(trimmed);
}

export function openHref(href: string) {
  const trimmed = href.trim();
  if (!trimmed) {
    return;
  }
  if (isBrowserLink(trimmed)) {
    openExternal(trimmed);
    return;
  }
  router.push(trimmed as Href);
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
