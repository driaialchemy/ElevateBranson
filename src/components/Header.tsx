import { Image } from 'expo-image';
import { View } from 'react-native';

import { Button } from '@/components/Button';
import { openHref } from '@/components/openLink';
import { tokens } from '@/theme/tokens';

export function Header({ donateLabel, donateHref }: { donateLabel: string; donateHref: string }) {
  return (
    <View style={{ alignItems: 'center', flexDirection: 'row', gap: tokens.space.sm, justifyContent: 'space-between' }}>
      <Image
        accessibilityLabel="Elevate Branson"
        contentFit="contain"
        source={require('../../assets/brand/logo.png')}
        style={{ height: 56, width: 140 }}
      />
      <View style={{ flexShrink: 1 }}>
        <Button label={donateLabel} onPress={() => openHref(donateHref)} variant="donate" />
      </View>
    </View>
  );
}
