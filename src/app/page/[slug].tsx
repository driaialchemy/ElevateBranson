import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { renderPageBlock } from '@/components/PageBlockRenderer';
import { pageBySlug } from '@/content/pageRoutes';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { siteImage } from '@/content/siteImages';
import { tokens } from '@/theme/tokens';

export default function PageScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data } = useContent();
  const page = pageBySlug(data.pages ?? [], slug);
  return <Screen><Stack.Screen options={{ title: page?.title ?? 'Page not found' }} />{page ? <>
    {page.heroImage && siteImage(page.heroImage.url) ? <Image accessibilityLabel={page.heroImage.alt} contentFit="cover" source={siteImage(page.heroImage.url)} style={{ height: 260, width: '100%' }} /> : null}
    <Text accessibilityRole="header" style={{ color: tokens.color.text, fontFamily: tokens.font.family.heading, fontSize: tokens.font.size.hero, lineHeight: tokens.font.lineHeight.hero }}>{page.title}</Text>
    <Text style={{ color: tokens.color.text, fontFamily: tokens.font.family.body, fontSize: tokens.font.size.body, lineHeight: tokens.font.lineHeight.body }}>{page.summary}</Text>
    {page.blocks.map((block, i) => <View key={`${block._type}-${i}`}>{renderPageBlock(block, data, data.pages)}</View>)}
  </> : <><Text accessibilityRole="header" style={{ color: tokens.color.text, fontFamily: tokens.font.family.heading, fontSize: tokens.font.size.header }}>Page not found</Text><Text style={{ color: tokens.color.text }}>This page is not available in the app yet.</Text><Button label="Go home" onPress={() => router.replace('/')} /></>}</Screen>;
}
