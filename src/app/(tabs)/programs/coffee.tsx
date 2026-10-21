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

export default function CoffeeScreen() {
  const { data } = useContent();
  const program = programBySlug(data.programs, 'coffee');
  const hours = hoursFor(data, 'coffee');
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
      <SectionHeader label="Cafe and Coffee" />
      <Card title="On the menu" body="Espresso drinks, lunch specials, desserts, and coffee subscriptions." />
      <Button label="Café and coffee on the website" onPress={() => openExternal('https://elevatebranson.org/elevate-cafe-and-coffee/')} />
      <Card title="Coffee subscriptions" body={'12 oz beans: $13.99 whole bean, $14.99 ground\n1 lb beans: $17.99 whole bean, $18.99 ground\nK-Cups: 12 for $17.49, 24 for $29.99, 48 for $48.99'} />
      <Button label="50% off coupon" onPress={() => openExternal('https://elevatebranson.org/elevate-cafe-and-coffee/coupon/')} />
    </Screen>
  );
}
