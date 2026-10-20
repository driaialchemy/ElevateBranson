import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ComingSoon } from '@/components/ComingSoon';
import { ContentNotice } from '@/components/ContentNotice';
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
      <Card title="A natural playground" body="Natural outdoor play gives children dealing with trauma and stress a place to play and explore." />
      <SectionHeader label="Playground sponsorship" />
      <Card title="Phase I" body="$2,500–$95,000" />
      <Card title="Phase II" body="$5,000–$20,000" />
      <Button label="Elevate Our Local Kids" onPress={() => openExternal('https://elevatebranson.org/elevate-kids-sponsorship/')} />
      <Button label="Schedule a Tour" onPress={() => openExternal(data.siteSettings.tourUrl)} />
    </Screen>
  );
}
