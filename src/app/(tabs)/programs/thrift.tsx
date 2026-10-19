import { AddressCard } from '@/components/AddressCard';
import { BrandImage } from '@/components/BrandImage';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { openExternal } from '@/components/openLink';
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
      {program?.imageKey ? <BrandImage alt={program.imageAlt || program.name} imageKey={program.imageKey} /> : null}
      {program ? <Card body={program.summary} title={program.name} /> : null}
      {program ? (
        <Button label="Read this on the website" onPress={() => openExternal(program.sourceUrl)} />
      ) : null}
      <AddressCard address={data.siteSettings.address} hours={hours} phone={data.siteSettings.thriftPhone} />
    </Screen>
  );
}
