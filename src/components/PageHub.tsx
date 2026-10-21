import { Text, View } from 'react-native';

import { Card } from '@/components/Card';
import { Hero } from '@/components/Hero';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';
import { pageBlurb } from '@/content/pageRoutes';
import { programDetails } from '@/content/programDetails';
import type { PageSection } from '@/content/types';
import { tokens } from '@/theme/tokens';

const sectionTitles: Record<PageSection, string> = { about: 'About', 'what-we-do': 'What We Do', 'get-involved': 'Get Involved', visit: 'Visit', media: 'Media', contact: 'Contact' };

export function PageHub({ section, title, included = [section] }: { section: PageSection; title?: string; included?: PageSection[] }) {
  const { data } = useContent();
  const pages = (data.pages ?? []).filter((page) => included.includes(page.section) && !page.slug.startsWith('forms-') && !page.slug.startsWith('volunteer-form-'));
  const heading = title ?? sectionTitles[section];
  // The intro is the section's own page when there is one, else the mission; never an arbitrary child page's summary.
  const intro = pages.find((page) => page.slug === section);
  const featured = intro;
  const subtitle = intro?.summary || data.siteSettings.mission;
  return <Screen><Hero imageKey="hero" imageUrl={featured?.heroImage?.url} alt={featured?.heroImage?.alt ?? 'Elevate Branson neighbors and volunteers'} title={heading} subtitle={subtitle} /><SectionHeader label={heading} /><View style={{ gap: tokens.space.md }}>{pages.map((page) => <Card key={page.slug} title={page.title} body={pageBlurb(page.summary)} imageUrl={page.heroImage?.url} alt={page.heroImage?.alt} href={section === 'what-we-do' && page.slug in programDetails ? `/programs/${page.slug}` : section === 'get-involved' && page.slug === 'volunteer' ? '/get-involved/volunteer' : section === 'get-involved' && page.slug === 'schedule-a-tour' ? '/get-involved/tour' : `/page/${page.slug}`} />)}</View></Screen>;
}
