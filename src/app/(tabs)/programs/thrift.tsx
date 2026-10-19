import { AddressCard } from '@/components/AddressCard';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { hoursFor, programBySlug } from '@/content/query';

export default function ThriftScreen() {
  const { data } = useContent();
  const program = programBySlug(data.programs, 'thrift');
  const hours = hoursFor(data, 'thrift');

  return (
    <Screen>
      <ContentNotice />
      {program ? <Card body={program.summary} title={program.name} /> : null}
      <AddressCard address={data.siteSettings.address} hours={hours} phone={data.siteSettings.thriftPhone} />
    </Screen>
  );
}
