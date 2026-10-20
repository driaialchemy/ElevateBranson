import { Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { Hero } from '@/components/Hero';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';
import { programDetails } from '@/content/programDetails';
import type { PageSection } from '@/content/types';
import { tokens } from '@/theme/tokens';

const sectionTitles: Record<PageSection, string> = { about: 'About', 'what-we-do': 'What We Do', 'get-involved': 'Get Involved', visit: 'Visit', media: 'Media', contact: 'Contact' };

export function PageHub({ section, title, included = [section] }: { section: PageSection; title?: string; included?: PageSection[] }) {
  const { data } = useContent();
  const pages = (data.pages ?? []).filter((page) => included.includes(page.section) && !page.slug.startsWith('forms-'));
  const heading = title ?? sectionTitles[section];
  const featured = pages[0];
  return <Screen>{featured ? <Hero imageKey="hero" imageUrl={featured.heroImage?.url} alt={featured.heroImage?.alt ?? featured.title} title={heading} subtitle={featured.summary} /> : <Text accessibilityRole="header" style={{ color: tokens.color.text, fontFamily: tokens.font.family.heading, fontSize: tokens.font.size.hero }}>{heading}</Text>}<SectionHeader label={heading} /><View style={{ gap: tokens.space.md }}>{pages.map((page) => <Card key={page.slug} title={page.title} body={page.summary} imageUrl={page.heroImage?.url} alt={page.heroImage?.alt} href={section === 'what-we-do' && page.slug in programDetails ? `/programs/${page.slug}` : `/page/${page.slug}`} />)}</View></Screen>;
}
