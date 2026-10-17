import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { HoursBlock } from '@/components/HoursBlock';
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
      {program ? <Card body={program.summary} title={program.name} /> : null}
      {hours ? <HoursBlock hours={hours} /> : null}
    </Screen>
  );
}
