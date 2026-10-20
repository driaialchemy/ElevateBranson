import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ComingSoon } from '@/components/ComingSoon';
import { ContentNotice } from '@/components/ContentNotice';
import { Hero } from '@/components/Hero';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';
import { readOnWebsite, whoItServes } from '@/content/infoScreens';
import { newestUpdates, programBySlug } from '@/content/query';

export default function TinyHouseScreen() {
  const { data } = useContent();
  const program = programBySlug(data.programs, 'elevate-community');
  const updates = newestUpdates(data.tinyHouseUpdates);
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
      <SectionHeader label="Updates" />
      {updates.length === 0 ? (
        <ComingSoon phone={phone} />
      ) : (
        updates.map((update) => <Card body={`${update.publishedOn}. ${update.body}`} key={update.id} title={update.title} />)
      )}
    </Screen>
  );
}
