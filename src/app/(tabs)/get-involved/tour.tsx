import { useState } from 'react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { HoneypotField } from '@/components/HoneypotField';
import { openExternal } from '@/components/openLink';
import { PrivacyLine } from '@/components/PrivacyLine';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { useContent } from '@/content/client';
import { deliverForm } from '@/forms/deliver';
import { fieldErrors, tourSchema } from '@/forms/schema';
import { useNetwork } from '@/network/NetworkProvider';

export default function TourScreen() {
  const { data } = useContent();
  const { online } = useNetwork();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferred, setPreferred] = useState('');
  const [groupSize, setGroupSize] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState(false);

  async function submit() {
    const parsed = tourSchema.safeParse({
      type: 'tour',
      name,
      email,
      phone,
      preferred,
      groupSize,
      company,
    });
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      return;
    }
    setErrors({});
    setPending(true);
    try {
      setNotice(await deliverForm(parsed.data, online));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setPending(false);
    }
  }

  if (notice) {
    return (
      <Screen>
        <Card body={notice} title="Request received" />
      </Screen>
    );
  }

  return (
    <Screen>
      <ContentNotice />
      <Card
        body="The website form is the usual way to ask for a tour. Use the form below if that page will not open."
        title="Schedule a tour"
      />
      <Button label="Schedule on the website" onPress={() => openExternal(data.siteSettings.tourUrl)} />
      <TextField error={errors.name} label="Name" onChangeText={setName} value={name} />
      <TextField error={errors.email} keyboardType="email-address" label="Email" onChangeText={setEmail} value={email} />
      <TextField error={errors.phone} keyboardType="phone-pad" label="Phone" onChangeText={setPhone} value={phone} />
      <TextField
        error={errors.preferred}
        label="Days and times that work for you"
        multiline
        onChangeText={setPreferred}
        value={preferred}
      />
      <TextField
        error={errors.groupSize}
        keyboardType="number-pad"
        label="Number of people"
        onChangeText={setGroupSize}
        value={groupSize}
      />
      <HoneypotField onChangeText={setCompany} value={company} />
      <PrivacyLine />
      <Button label={pending ? 'Sending' : 'Send a tour request'} onPress={() => void submit()} />
    </Screen>
  );
}
