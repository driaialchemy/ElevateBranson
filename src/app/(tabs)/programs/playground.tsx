import { BrandImage } from '@/components/BrandImage';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { HoursBlock } from '@/components/HoursBlock';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { hoursFor, programBySlug } from '@/content/query';

export default function PlaygroundScreen() {
  const { data } = useContent();
  const program = programBySlug(data.programs, 'playground');
  const hours = hoursFor(data, 'playground');

  return (
    <Screen>
      <ContentNotice />
      {program?.imageKey ? <BrandImage alt={program.imageAlt || program.name} imageKey={program.imageKey} /> : null}
      {program ? <Card body={program.summary} title={program.name} /> : null}
      {program ? (
        <Button label="Read this on the website" onPress={() => openExternal(program.sourceUrl)} />
      ) : null}
      {hours ? <HoursBlock hours={hours} /> : null}
    </Screen>
  );
}
