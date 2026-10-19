import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { HoursBlock } from '@/components/HoursBlock';
import { openCall, openMap } from '@/components/openLink';
import type { Hours } from '@/content/types';

export function AddressCard({
  address,
  phone,
  email,
  hours,
}: {
  address: string;
  phone: string;
  email?: string;
  hours?: Hours | null;
}) {
  return (
    <>
      <Card body={address} title="Address" />
      <Card body={email ? `${phone}\n${email}` : phone} title="Phone" />
      {hours ? <HoursBlock hours={hours} /> : null}
      <Button label={`Call ${phone}`} onPress={() => openCall(phone)} />
      <Button label="Open in Maps" onPress={() => openMap(address)} />
    </>
  );
}
