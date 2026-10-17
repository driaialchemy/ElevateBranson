import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { HoursBlock } from '@/components/HoursBlock';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { hoursFor, programBySlug } from '@/content/query';
import { openCall, openMap } from '@/components/openLink';

export default function ThriftScreen() {
  const { data } = useContent();
  const program = programBySlug(data.programs, 'thrift');
  const hours = hoursFor(data, 'thrift');
  const thriftPhone = data.siteSettings.thriftPhone;

  return (
    <Screen>
      <ContentNotice />
      {program ? <Card body={program.summary} title={program.name} /> : null}
      <Card body={data.siteSettings.address} title="Address" />
      <Button label={`Call ${thriftPhone}`} onPress={() => openCall(thriftPhone)} />
      <Button label="Open in maps" onPress={() => openMap(data.siteSettings.address)} />
      {hours ? <HoursBlock hours={hours} /> : null}
    </Screen>
  );
}
