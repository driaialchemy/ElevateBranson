import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Linking, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { FAQAccordion } from '@/components/FAQAccordion';
import { Hero } from '@/components/Hero';
import { renderPageBlock } from '@/components/PageBlockRenderer';
import { openHref } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';
import { isUpcoming, isValidIsoDate } from '@/content/dates';
import { pageBySlug } from '@/content/pageRoutes';
import { programDetails } from '@/content/programDetails';
import { programBySlug, todayIso } from '@/content/query';
import { tokens } from '@/theme/tokens';

const bodyStyle = { color: tokens.color.text, fontFamily: tokens.font.family.body, fontSize: tokens.font.size.body, lineHeight: tokens.font.lineHeight.body } as const;

function displayDate(date: string) {
  const value = new Date(`${date}T00:00:00Z`);
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(value);
}

export default function ProgramDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const routeSlug = typeof slug === 'string' ? slug : '';
  const { data } = useContent();
  const program = programBySlug(data.programs, routeSlug);
  const page = pageBySlug(data.pages ?? [], routeSlug);
  const detail = programDetails[routeSlug];
  const title = page?.title ?? program?.name ?? 'Program';
  const summary = page?.summary ?? program?.summary ?? '';
  const verifiedDates = detail?.dates?.filter((item) => item.lastVerified && isValidIsoDate(item.lastVerified) && isUpcoming(item.endsOn ?? item.startsOn, todayIso())) ?? [];
  const sortedDates = [...verifiedDates].sort((a, b) => a.startsOn.localeCompare(b.startsOn));

  if (!page && !program) {
    return <Screen><Stack.Screen options={{ title: 'Program not found' }} /><Text accessibilityRole="header" style={bodyStyle}>Program not found</Text><Text style={bodyStyle}>This program is not available in the app yet.</Text><Button label="Go home" onPress={() => router.replace('/')} /></Screen>;
  }

  return <Screen>
    <Stack.Screen options={{ title }} />
    <ContentNotice />
    <Hero alt={page?.heroImage?.alt ?? program?.imageAlt ?? title} imageKey={program?.imageKey ?? 'hero'} imageUrl={page?.heroImage?.url} subtitle={summary} title={title} />
    <SectionHeader label="About" />
    <Text style={bodyStyle}>{summary}</Text>
    {detail?.facts.length ? <><SectionHeader label="Program details" />{detail.facts.map((fact) => <Card key={fact.label} title={fact.label} body={fact.value} />)}</> : null}
    {detail?.table ? <><SectionHeader label="Pricing" />{renderPageBlock({ _type: 'table', ...detail.table }, data, data.pages)}</> : null}
    {sortedDates.length ? <><SectionHeader label="Upcoming dates" />{sortedDates.map((item) => <Card key={`${item.title}-${item.startsOn}`} title={item.title} body={`${displayDate(item.startsOn)}${item.endsOn ? ` – ${displayDate(item.endsOn)}` : ''}\nVerified ${displayDate(item.lastVerified as string)}.`} />)}</> : null}
    {detail?.dates?.length && !sortedDates.length ? <Card title="Next class dates" body={`No upcoming dates are listed. Contact ${detail.contact?.name ?? 'Elevate Branson'} for the next schedule.`} /> : null}
    {detail?.staleDateCount ? <Card title="Older dates hidden" body={`${detail.staleDateCount} stale event-date groups from 2024 and 2025 are hidden until the current schedule is confirmed.`} /> : null}
    {detail?.timeline?.length ? <><SectionHeader label="Project timeline" />{detail.timeline.map((item) => <Card key={item.title} title={`${item.date} · ${item.title}`} body={item.body ?? ''} />)}</> : null}
    {detail?.faq?.length ? <><SectionHeader label="Frequently asked questions" /><FAQAccordion items={detail.faq} /></> : null}
    {detail?.offerings?.length ? <><SectionHeader label="Programs and services" /><View style={{ gap: tokens.space.sm }}>{detail.offerings.map((item) => <Card key={item.title} title={item.title} body={item.summary} />)}</View></> : null}
    {detail?.contact ? <><SectionHeader label="Contact" /><Card title={detail.contact.name} body={detail.contact.role ?? title} /><Button label={`Call ${detail.contact.name} · ${detail.contact.phone}`} onPress={() => void Linking.openURL(`tel:${detail.contact?.phone}`)} /></> : null}
    {detail?.extraContacts?.map((contact) => <View key={contact.phone}><Card title={contact.name} body={contact.role ?? title} /><Button label={`Call ${contact.name} · ${contact.phone}`} onPress={() => void Linking.openURL(`tel:${contact.phone}`)} /></View>)}
    {detail?.actions.map((action) => <Button key={action.url} label={action.label} onPress={() => openHref(action.url)} />)}
    {detail?.volunteerUrl ? <Button label="Volunteer for this program" onPress={() => openHref(detail.volunteerUrl as string)} /> : null}
    {page?.blocks.map((block, index) => <View key={`${block._type}-${index}`}>{renderPageBlock(block, data, data.pages)}</View>)}
  </Screen>;
}
