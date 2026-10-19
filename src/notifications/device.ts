import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

import { topics, type Topic } from '@/push/topics';

const tokenKey = 'push-token';
const topicsKey = 'push-topics';

export async function savedTopics(): Promise<Topic[]> {
  const raw = await AsyncStorage.getItem(topicsKey);
  if (!raw) {
    return [...topics];
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [...topics];
    }
    return parsed.filter((item): item is Topic => topics.includes(item as Topic));
  } catch {
    return [...topics];
  }
}

export async function saveTopics(next: Topic[]) {
  await AsyncStorage.setItem(topicsKey, JSON.stringify(next));
  const token = await AsyncStorage.getItem(tokenKey);
  if (token) {
    await postRegistration(token, next);
  }
}

export async function enablePush(next: Topic[]): Promise<{ token: string } | { error: string }> {
  if (Platform.OS === 'web') {
    return { error: 'Notes can be turned on from the Elevate Branson app on a phone.' };
  }
  try {
    const Notifications = await import('expo-notifications');
    const Device = await import('expo-device');
    if (!Device.isDevice) {
      return { error: 'Notes can be turned on from the Elevate Branson app on a phone.' };
    }
    const current = await Notifications.getPermissionsAsync();
    const nextStatus =
      current.status === 'granted' ? current.status : (await Notifications.requestPermissionsAsync()).status;
    if (nextStatus !== 'granted') {
      return { error: 'Notifications stay off until you allow them in the phone settings.' };
    }
    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId ?? undefined;
    const token = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);
    await AsyncStorage.setItem(tokenKey, token.data);
    await saveTopics(next);
    return { token: token.data };
  } catch {
    return { error: 'Notes could not be turned on from this device.' };
  }
}

async function postRegistration(token: string, next: Topic[]) {
  const url = registerUrl();
  if (!url) {
    return;
  }
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, topics: next }),
    });
  } catch {
    // The phone keeps the choice and can try again the next time it is saved.
  }
}

function registerUrl(): string {
  const configured = process.env.EXPO_PUBLIC_SUBMIT_URL?.trim() ?? '';
  if (configured && !configured.includes('your-worker.example')) {
    return configured.replace(/\/api\/submit\/?$/, '') + '/api/push/register';
  }
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    return `${window.location.origin}/api/push/register`;
  }
  return '';
}

export async function savedToken(): Promise<string> {
  return (await AsyncStorage.getItem(tokenKey)) ?? '';
}
