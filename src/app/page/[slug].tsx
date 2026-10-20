import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { openCall, openExternal } from '@/components/openLink';
import { renderPageBlock } from '@/components/PageBlockRenderer';
import { pageBySlug } from '@/content/pageRoutes';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { siteImage } from '@/content/siteImages';
import { tokens } from '@/theme/tokens';
import { givingDetails, volunteerStories } from '@/content/getInvolved';

export default function PageScreen() {
  const { slug, story } = useLocalSearchParams<{ slug: string; story?: string }>();
  const { data } = useContent();
  const page = pageBySlug(data.pages ?? [], slug);
  const stories = page?.slug === 'meet-our-volunteers' ? volunteerStories(page) : [];
  const selectedStory = stories.find((item) => item.id === story);
  const titleStyle = { color: tokens.color.text, fontFamily: tokens.font.family.heading, fontSize: tokens.font.size.header, lineHeight: tokens.font.lineHeight.header } as const;
  const bodyStyle = { color: tokens.color.text, fontFamily: tokens.font.family.body, fontSize: tokens.font.size.body, lineHeight: tokens.font.lineHeight.body } as const;
  return <Screen><Stack.Screen options={{ title: page?.title ?? 'Page not found' }} />{page ? <>
    {selectedStory ? <><Text accessibilityRole="header" style={titleStyle}>{selectedStory.name}</Text><Text style={bodyStyle}>{selectedStory.body}</Text><Button label="All volunteer stories" onPress={() => router.replace('/page/meet-our-volunteers')} /></> : null}
    {page.heroImage && siteImage(page.heroImage.url) ? <Image accessibilityLabel={page.heroImage.alt} contentFit="cover" source={siteImage(page.heroImage.url)} style={{ height: 260, width: '100%' }} /> : null}
    {!selectedStory ? <><Text accessibilityRole="header" style={{ color: tokens.color.text, fontFamily: tokens.font.family.heading, fontSize: tokens.font.size.hero, lineHeight: tokens.font.lineHeight.hero }}>{page.title}</Text>
    <Text style={bodyStyle}>{page.summary}</Text>
    {page.slug === 'facility-rentals' ? <Button label="Ask about a facility rental" onPress={() => router.push('/more/contact')} /> : null}
    {page.slug === 'meet-our-volunteers' ? <View style={{ gap: tokens.space.md }}>{stories.map((item) => <Card key={item.id} title={item.name} body={item.body} href={`/page/meet-our-volunteers?story=${item.id}`} />)}</View> : page.blocks.map((block, i) => <View key={`${block._type}-${i}`}>{renderPageBlock(block, data, data.pages)}</View>)}
    {page.slug === 'advance-team' ? <><Text accessibilityRole="header" style={titleStyle}>{givingDetails.advance.amount}</Text>{givingDetails.advance.benefits.map((benefit) => <Card key={benefit} body={benefit} />)}<Button label="Join the Advance Team" onPress={() => openExternal(givingDetails.advance.url)} /></> : null}
    {page.slug === 'business-partnership' ? <><Text accessibilityRole="header" style={titleStyle}>Partnership levels</Text><View style={{ borderBottomColor: tokens.color.border, borderBottomWidth: 1, gap: tokens.space.sm, paddingVertical: tokens.space.sm }}><View style={{ flexDirection: 'row', gap: tokens.space.sm }}><Text style={[bodyStyle, { flex: 1, fontFamily: tokens.font.family.heading }]}>Monthly contribution</Text><Text style={[bodyStyle, { flex: 1, fontFamily: tokens.font.family.heading }]}>Company size</Text></View>{givingDetails.businessTiers.map((tier) => <View key={tier.tier} style={{ flexDirection: 'row', gap: tokens.space.sm }}><Text style={[bodyStyle, { flex: 1 }]}>{tier.price}</Text><Text style={[bodyStyle, { flex: 1 }]}>{tier.employees}</Text></View>)}</View>{givingDetails.businessBenefits.map((benefit) => <Card key={benefit} body={benefit} />)}<Button label="Become a Business Partner" onPress={() => openExternal(givingDetails.businessUrl)} /></> : null}
    {page.slug === 'branding-licensure' ? <><Text accessibilityRole="header" style={titleStyle}>Bring an Elevate to your community</Text>{givingDetails.brandSteps.map((step, i) => <Card key={step} title={`Step ${i + 1}`} body={step} />)}<Button label="Start the pre-assessment" onPress={() => openExternal(givingDetails.brandUrl)} /></> : null}
    {page.slug === 'leaving-a-legacy' ? <>{givingDetails.legacyOptions.map((option) => <Card key={option} body={option} />)}<Card title={givingDetails.legacyContact.name} body={givingDetails.legacyContact.phone} /><Button label={`Call ${givingDetails.legacyContact.phone}`} onPress={() => openCall(givingDetails.legacyContact.phone)} /></> : null}
    {page.slug === 'rewards-program' ? <>{givingDetails.rewards.map((item) => <Card key={item} body={item} />)}<Button label="Volunteer and earn Rewards" onPress={() => router.push('/get-involved/volunteer')} /></> : null}</> : null}
  </> : <><Text accessibilityRole="header" style={{ color: tokens.color.text, fontFamily: tokens.font.family.heading, fontSize: tokens.font.size.header }}>Page not found</Text><Text style={{ color: tokens.color.text }}>This page is not available in the app yet.</Text><Button label="Go home" onPress={() => router.replace('/')} /></>}</Screen>;
}
