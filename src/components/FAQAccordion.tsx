import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { tokens } from '@/theme/tokens';

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return <View style={{ gap: tokens.space.xs }}>{items.map((item, index) => <View key={item.question} style={{ borderColor: tokens.color.border, borderRadius: tokens.radius, borderWidth: 1, overflow: 'hidden' }}>
    <Pressable accessibilityLabel={item.question} accessibilityRole="button" accessibilityState={{ expanded: open === index }} onPress={() => setOpen(open === index ? null : index)} style={{ justifyContent: 'center', minHeight: tokens.tapTarget, padding: tokens.space.sm }}>
      <Text style={{ color: tokens.color.text, fontFamily: tokens.font.family.heading, fontSize: tokens.font.size.body, lineHeight: tokens.font.lineHeight.body }}>{item.question}</Text>
    </Pressable>
    {open === index ? <Text style={{ color: tokens.color.text, fontFamily: tokens.font.family.body, fontSize: tokens.font.size.body, lineHeight: tokens.font.lineHeight.body, padding: tokens.space.sm }}>{item.answer}</Text> : null}
  </View>)}</View>;
}
