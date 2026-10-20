import { Stack, useLocalSearchParams } from 'expo-router';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ComingSoon } from '@/components/ComingSoon';
import { ContentNotice } from '@/components/ContentNotice';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ListRow } from '@/components/ListRow';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';
import { howToHelp, readOnWebsite, whoItServes } from '@/content/infoScreens';
import { programBySlug } from '@/content/query';
import { getInvolvedLinks } from '@/navigation/map';

const involveHrefs = new Set(['/get-involved/volunteer', '/get-involved/give']);

export default function ProgramDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data } = useContent();
  const program = typeof slug === 'string' ? programBySlug(data.programs, slug) : undefined;
  const phone = data.siteSettings.phone;
  const donateLabel = data.siteSettings.donateLabel || 'DONATE NOW';

  if (!program) {
    return (
      <Screen>
        <ContentNotice />
        <ComingSoon phone={phone} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: program.name }} />
      <ContentNotice />
      <Header donateHref="/get-involved/give" donateLabel={donateLabel} />
      {program.imageKey ? (
        <Hero alt={program.imageAlt || program.name} imageKey={program.imageKey} subtitle={program.summary} title={program.name} />
      ) : (
        <Card body={program.summary} title={program.name} />
      )}
      {program.serves ? (
        <>
          <SectionHeader label={whoItServes} />
          <Card body={program.serves} />
        </>
      ) : null}
      <SectionHeader label={howToHelp} />
      {getInvolvedLinks
        .filter((item) => involveHrefs.has(item.href))
        .map((item) => (
          <ListRow
            detail={item.detail}
            href={item.href}
            icon={item.href.endsWith('give') ? 'heart-outline' : 'people-outline'}
            key={item.href}
            label={item.label}
          />
        ))}
      <Button label={readOnWebsite} onPress={() => openExternal(program.sourceUrl)} />
    </Screen>
  );
}
