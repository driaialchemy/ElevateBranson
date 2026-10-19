import { AddressCard } from '@/components/AddressCard';
import { ContentNotice } from '@/components/ContentNotice';
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
      <AddressCard address={address} email={infoEmail} hours={hours} phone={phone} />
    </Screen>
  );
}
