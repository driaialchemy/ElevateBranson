import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ComingSoon } from '@/components/ComingSoon';
import { ContentNotice } from '@/components/ContentNotice';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HoursBlock } from '@/components/HoursBlock';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';
import { readOnWebsite, whoItServes } from '@/content/infoScreens';
import { hoursFor, programBySlug } from '@/content/query';

export default function PlaygroundScreen() {
  const { data } = useContent();
  const program = programBySlug(data.programs, 'playground');
  const hours = hoursFor(data, 'playground');
  const phone = data.siteSettings.phone;

  return (
    <Screen>
      <ContentNotice />
      <Header donateHref="/get-involved/give" donateLabel={data.siteSettings.donateLabel || 'DONATE NOW'} />
      {program?.imageKey ? (
        <Hero alt={program.imageAlt || program.name} imageKey={program.imageKey} subtitle={program.summary} title={program.name} />
      ) : program ? (
        <Card body={program.summary} title={program.name} />
      ) : (
        <ComingSoon phone={phone} />
      )}
      {program?.serves ? (
        <>
          <SectionHeader label={whoItServes} />
          <Card body={program.serves} />
        </>
      ) : null}
      {program ? <Button label={readOnWebsite} onPress={() => openExternal(program.sourceUrl)} /> : null}
      {hours ? <HoursBlock hours={hours} /> : <ComingSoon phone={phone} />}
    </Screen>
  );
}
