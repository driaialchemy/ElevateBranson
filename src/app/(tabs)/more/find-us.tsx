import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { HoursBlock } from '@/components/HoursBlock';
import { openCall, openMap } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { hoursFor } from '@/content/query';

export default function FindUsScreen() {
  const { data } = useContent();
  const hours = hoursFor(data, 'campus');
  const { address, phone, infoEmail } = data.siteSettings;

  return (
    <Screen>
      <ContentNotice />
      <Card body={address} title="Campus" />
      <Card body={`${phone}\n${infoEmail}`} title="Contact" />
      <Button label={`Call ${phone}`} onPress={() => openCall(phone)} />
      <Button label="Open in maps" onPress={() => openMap(address)} />
      {hours ? <HoursBlock hours={hours} /> : null}
    </Screen>
  );
}
