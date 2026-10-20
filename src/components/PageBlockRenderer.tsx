import { Image } from 'expo-image';
import { Linking, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { HoursBlock } from '@/components/HoursBlock';
import { openExternal, openHref } from '@/components/openLink';
import { siteImage } from '@/content/siteImages';
import type { ContentBundle, Page, PageBlock } from '@/content/types';
import { hoursFor } from '@/content/query';
import { pageBySlug } from '@/content/pageRoutes';
import { tokens } from '@/theme/tokens';

const bodyStyle = { color: tokens.color.text, fontFamily: tokens.font.family.body, fontSize: tokens.font.size.body, lineHeight: tokens.font.lineHeight.body } as const;
const headingStyle = { ...bodyStyle, fontFamily: tokens.font.family.heading, fontSize: tokens.font.size.header, lineHeight: tokens.font.lineHeight.header } as const;

export function renderPageBlock(block: PageBlock, data: ContentBundle, pages: Page[] = []): React.ReactNode {
  switch (block._type) {
    case 'richText': return <View style={{ gap: tokens.space.sm }}>{block.headings?.map((heading, i) => <Text key={`h${i}`} accessibilityRole="header" style={headingStyle}>{heading}</Text>)}{block.paragraphs.map((p, i) => <Text key={i} style={bodyStyle}>{p}</Text>)}</View>;
    case 'buttonRow': return <View style={{ gap: tokens.space.sm }}>{block.buttons.map((b) => <Button key={`${b.label}-${b.url}`} label={b.label} onPress={() => openHref(b.url)} />)}</View>;
    case 'cardGrid': return <View style={{ gap: tokens.space.md }}>{block.cards.map((c) => <Card key={c.title} title={c.title} body={c.summary} imageUrl={c.image?.url} alt={c.image?.alt} href={c.url} />)}</View>;
    case 'statRow': return <View style={{ gap: tokens.space.sm }}>{block.items.map((x, i) => <Text key={i} style={headingStyle}>{x.value} · {x.label}</Text>)}</View>;
    case 'factList': return <View style={{ gap: tokens.space.xs }}>{block.items.map((x) => <Text key={x.label} style={bodyStyle}><Text style={headingStyle}>{x.label}: </Text>{x.value}</Text>)}</View>;
    case 'table': return <View style={{ gap: tokens.space.xs }}>{block.headers.map((h, i) => <Text key={`h${i}`} style={headingStyle}>{h}</Text>)}{block.rows.map((row, i) => <Text key={i} style={bodyStyle}>{row.join(' · ')}</Text>)}</View>;
    case 'hoursTable': { const item = hoursFor(data, block.hoursId as 'campus' | 'coffee' | 'thrift' | 'playground'); return item ? <HoursBlock hours={item} /> : <Text style={bodyStyle}>Hours are not available offline.</Text>; }
    case 'contactCard': return <View style={{ gap: tokens.space.xs }}><Text style={headingStyle}>{block.name}</Text>{block.role ? <Text style={bodyStyle}>{block.role}</Text> : null}{block.phone ? <Button label={block.phone} onPress={() => void Linking.openURL(`tel:${block.phone}`)} /> : null}{block.email ? <Button label={block.email} onPress={() => void Linking.openURL(`mailto:${block.email}`)} /> : null}</View>;
    case 'pdfLink': return <Button label={block.title} onPress={() => openExternal(block.url)} />;
    case 'formLink': return <Button label={block.title} onPress={() => openExternal(block.url)} />;
    case 'embed': return <Button label={`Open ${block.provider}`} onPress={() => openExternal(block.url)} />;
    case 'faq': return <View style={{ gap: tokens.space.md }}>{block.items.map((x, i) => <View key={i} style={{ gap: tokens.space.xs }}><Text style={headingStyle}>{x.question}</Text><Text style={bodyStyle}>{x.answer}</Text></View>)}</View>;
    case 'timeline': return <View style={{ gap: tokens.space.md }}>{block.items.map((x, i) => <View key={i}><Text style={headingStyle}>{x.date} · {x.title}</Text>{x.body ? <Text style={bodyStyle}>{x.body}</Text> : null}</View>)}</View>;
    case 'storyList': return <View style={{ gap: tokens.space.sm }}>{block.storyIds.map((id) => { const story = data.stories?.find((s) => s.id === id || s.slug === id); return story ? <Card key={id} title={story.title} body={story.summary} /> : null; })}</View>;
    case 'imageGallery': return <View style={{ gap: tokens.space.sm }}>{block.images.map((x, i) => { const source = siteImage(x.url); return source ? <Image key={`${x.url}-${i}`} accessibilityLabel={x.alt} contentFit="cover" source={source} style={{ height: 200, width: '100%' }} /> : null; })}</View>;
    case 'todo': return <Card body={block.message} />;
    default: return null;
  }
}
