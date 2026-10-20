import { AddressCard } from '@/components/AddressCard';
import { ComingSoon } from '@/components/ComingSoon';
import { ContentNotice } from '@/components/ContentNotice';
import { Header } from '@/components/Header';
import { Screen } from '@/components/Screen';
import { SectionHeader } from '@/components/SectionHeader';
import { useContent } from '@/content/client';
import { hoursFor } from '@/content/query';

export default function FindUsScreen() {
  const { data } = useContent();
  const hours = hoursFor(data, 'campus');
  const { address, phone, infoEmail, donateLabel } = data.siteSettings;

  return (
    <Screen>
      <ContentNotice />
      <Header donateHref="/get-involved/give" donateLabel={donateLabel || 'DONATE NOW'} />
      <SectionHeader label="Find Us" />
      {address ? (
        <AddressCard address={address} email={infoEmail} hours={hours} phone={phone} />
      ) : (
        <ComingSoon phone={phone} />
      )}
    </Screen>
  );
}
