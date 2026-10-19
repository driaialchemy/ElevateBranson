import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { countsAsUse, shouldOfferPush } from '@/push/offer';

const decidedKey = 'push-decided';
const meaningfulKey = 'push-meaningful';

export function PushOffer() {
  const path = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let active = true;
    void (async () => {
      if (countsAsUse(path)) {
        await AsyncStorage.setItem(meaningfulKey, 'yes');
      }
      const [meaningful, decided] = await Promise.all([
        AsyncStorage.getItem(meaningfulKey),
        AsyncStorage.getItem(decidedKey),
      ]);
      if (active) {
        setVisible(shouldOfferPush(path, meaningful === 'yes', decided === 'yes' || decided === 'no'));
      }
    })();
    return () => {
      active = false;
    };
  }, [path]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <Card
        body="Want a short note when there is news, an event, a program update, a giving need, or a housing change? You choose which ones."
        title="Notes from Elevate Branson"
      />
      <Button label="See how notes work" onPress={() => router.push('/more/notifications')} />
      <Button
        label="Not now"
        onPress={() => {
          void AsyncStorage.setItem(decidedKey, 'no');
          setVisible(false);
        }}
      />
    </>
  );
}

export const pushDecidedKey = decidedKey;
