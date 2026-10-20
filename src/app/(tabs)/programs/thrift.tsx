import { AddressCard } from '@/components/AddressCard';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ComingSoon } from '@/components/ComingSoon';
import { ContentNotice } from '@/components/ContentNotice';
import { Hero } from '@/components/Hero';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { readOnWebsite } from '@/content/infoScreens';
import { hoursFor, programBySlug } from '@/content/query';

export default function ThriftScreen() {
  const { data } = useContent();
  const program = programBySlug(data.programs, 'thrift');
  const hours = hoursFor(data, 'thrift');
  const phone = data.siteSettings.thriftPhone || data.siteSettings.phone;

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
      {program ? <Button label={readOnWebsite} onPress={() => openExternal(program.sourceUrl)} /> : null}
      {data.siteSettings.address ? (
        <AddressCard address={data.siteSettings.address} hours={hours} phone={phone} />
      ) : (
        <ComingSoon phone={data.siteSettings.phone} />
      )}
    </Screen>
  );
}
