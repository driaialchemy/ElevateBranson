import { AddressCard } from '@/components/AddressCard';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ComingSoon } from '@/components/ComingSoon';
import { ContentNotice } from '@/components/ContentNotice';
import { Hero } from '@/components/Hero';
import { openExternal } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
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
      <SectionHeader label="Donations" />
      <Card title="Drop-offs and pickups" body="Use the donation bin anytime. Staffed drop-offs can receive a receipt. Call the store to arrange a large-item pickup." />
      <Card title="Items not accepted" body="Mattresses and child car seats are not accepted." />
      <Button label="30% off coupon" onPress={() => openExternal('https://elevatebranson.org/elevate-thrift-store/coupon/')} />
      <Button label="Thrift rewards" onPress={() => openExternal('https://elevatebranson.org/rewards-program/')} />
      <Button label="Volunteer at the Thrift Store" onPress={() => openExternal('https://elevatebranson.org/volunteer/')} />
      {program ? <Button label={readOnWebsite} onPress={() => openExternal(program.sourceUrl)} /> : null}
      {data.siteSettings.address ? (
        <AddressCard address={data.siteSettings.address} hours={hours} phone={phone} />
      ) : (
        <ComingSoon phone={data.siteSettings.phone} />
      )}
    </Screen>
  );
}
