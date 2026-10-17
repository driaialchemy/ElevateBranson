import { ScrollView, View } from 'react-native';

import { ErrorState } from '@/components/ErrorState';
import { OfflineBanner } from '@/components/OfflineBanner';
import { offlineMessage } from '@/content/cache';
import { useNetwork } from '@/network/NetworkProvider';
import { tokens } from '@/theme/tokens';

export function Screen({ children }: { children: React.ReactNode }) {
  const { online, refresh } = useNetwork();

  return (
    <View style={{ backgroundColor: tokens.color.background, flex: 1 }}>
      <OfflineBanner />
      <ScrollView contentContainerStyle={{ gap: tokens.space.md, padding: tokens.space.md }}>
        {online ? null : <ErrorState message={offlineMessage} onRetry={() => void refresh()} />}
        {children}
      </ScrollView>
    </View>
  );
}
