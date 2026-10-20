import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { Hero } from '@/components/Hero';
import { ListRow } from '@/components/ListRow';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';

export default function AboutScreen() {
  const { data } = useContent();
  const hero = data.homeSections?.find((section) => section.id === 'hero');
  const donateLabel = data.siteSettings.donateLabel || 'DONATE NOW';

  return (
    <Screen>
      <ContentNotice />

      {hero?.imageKey ? (
        <Hero
          alt={hero.imageAlt || hero.title}
          imageKey={hero.imageKey}
          subtitle={hero.body}
          title={hero.title}
        />
      ) : null}
      <SectionHeader label="About" />
      {data.siteSettings.mission ? <Card body={data.siteSettings.mission} title="Mission" /> : null}
      {data.siteSettings.vision ? <Card body={data.siteSettings.vision} title="Vision" /> : null}
      <ListRow href="/more/find-us" icon="location-outline" label="Find Us" />
      <ListRow href="/more/newsletter" icon="newspaper-outline" label="Newsletter" />
    </Screen>
  );
}
