import { useEffect, useState } from 'react';
import { Animated, View } from 'react-native';

import { StatTile } from '@/components/StatTile';
import { tokens } from '@/theme/tokens';

export function AnimatedStatRow({ items }: { items: readonly { value: string; label: string }[] }) {
  const [progress] = useState(() => new Animated.Value(0));
  useEffect(() => { Animated.timing(progress, { toValue: 1, duration: 700, useNativeDriver: true }).start(); }, [progress]);
  return <Animated.View style={{ gap: tokens.space.sm, opacity: progress, transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] }}><View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space.sm }}>{items.map((item) => <View key={item.label} style={{ flexBasis: '46%', flexGrow: 1 }}><StatTile label={item.label} value={item.value} /></View>)}</View></Animated.View>;
}
