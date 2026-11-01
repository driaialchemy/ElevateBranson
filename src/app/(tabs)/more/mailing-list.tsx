import { useState } from 'react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { HoneypotField } from '@/components/HoneypotField';
import { PrivacyLine } from '@/components/PrivacyLine';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { submitUrl } from '@/forms/deliver';
import { newsletterSchema } from '@/forms/schema';
import { useSubmit } from '@/forms/useSubmit';

export default function MailingListScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [demo, setDemo] = useState('');
  const { errors, notice, pending, submit } = useSubmit(newsletterSchema);

  if (demo || notice) {
    return (
      <Screen>
        <Card body={demo || notice} title={demo ? 'Not sent' : 'Signup received'} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Card body="Email is required. Name is optional. This note goes to staff. It is not added to an outside mailing list until staff connect one." title="Join our mailing list" />
      <TextField error={errors.email} keyboardType="email-address" label="Email" onChangeText={setEmail} value={email} />
      <TextField error={errors.name} label="Name, if you want" onChangeText={setName} value={name} />
      <HoneypotField onChangeText={setCompany} value={company} />
      <PrivacyLine />
      {errors.form ? <Card body={errors.form} title="Please try again" /> : null}
      <Button
        label={pending ? 'Sending' : 'Join the list'}
        onPress={() => {
          if (!submitUrl()) {
            setDemo('Demo: not sent');
            return;
          }
          void submit({ type: 'newsletter', email, name, company });
        }}
      />
    </Screen>
  );
}
