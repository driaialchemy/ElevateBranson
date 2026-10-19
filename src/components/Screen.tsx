import { ScrollView, View } from 'react-native';

import { ErrorState } from '@/components/ErrorState';
import { OfflineBanner } from '@/components/OfflineBanner';
import { offlineMessage } from '@/content/cache';
import { PushOffer } from '@/notifications/PushOffer';
import { useNetwork } from '@/network/NetworkProvider';
import { tokens } from '@/theme/tokens';

export function Screen({ children }: { children: React.ReactNode }) {
  const { online, refresh } = useNetwork();

  return (
    <View style={{ backgroundColor: tokens.color.background, flex: 1, maxWidth: '100%', minWidth: 0, width: '100%' }}>
      <OfflineBanner />
      <ScrollView
        contentContainerStyle={{ gap: tokens.space.md, maxWidth: '100%', minWidth: 0, padding: tokens.space.md, width: '100%' }}
        style={{ flex: 1, maxWidth: '100%', minWidth: 0, width: '100%' }}>
        {online ? null : <ErrorState message={offlineMessage} onRetry={() => void refresh()} />}
        <PushOffer />
        {children}
      </ScrollView>
    </View>
  );
}
