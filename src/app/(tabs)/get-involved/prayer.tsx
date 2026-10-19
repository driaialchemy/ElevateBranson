import { useState } from 'react';
import { Switch, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { HoneypotField } from '@/components/HoneypotField';
import { PrivacyLine } from '@/components/PrivacyLine';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { deliverForm } from '@/forms/deliver';
import { fieldErrors, prayerSchema } from '@/forms/schema';
import { useNetwork } from '@/network/NetworkProvider';
import { tokens } from '@/theme/tokens';

export default function PrayerScreen() {
  const { online } = useNetwork();
  const [request, setRequest] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [sharePublicly, setSharePublicly] = useState(false);
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState(false);

  async function submit() {
    const parsed = prayerSchema.safeParse({
      type: 'prayer',
      request,
      name,
      contact,
      sharePublicly,
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
      <TextField error={errors.request} label="Prayer request" multiline onChangeText={setRequest} value={request} />
      <TextField label="Name, if you want" onChangeText={setName} value={name} />
      <TextField label="Email or phone, if you want a reply" onChangeText={setContact} value={contact} />
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: tokens.space.md, minHeight: tokens.tapTarget }}>
        <Switch
          accessibilityLabel="Share this request publicly"
          onValueChange={setSharePublicly}
          thumbColor={tokens.color.surface}
          trackColor={{ false: tokens.color.border, true: tokens.color.primary }}
          value={sharePublicly}
        />
        <Text
          style={{
            color: tokens.color.text,
            flex: 1,
            fontFamily: tokens.font.family.body,
            fontSize: tokens.font.size.body,
            lineHeight: tokens.font.lineHeight.body,
          }}>
          Share this publicly. Leave this off and it stays with the prayer team.
        </Text>
      </View>
      <HoneypotField onChangeText={setCompany} value={company} />
      <PrivacyLine />
      <Button label={pending ? 'Sending' : 'Send to the prayer team'} onPress={() => void submit()} />
    </Screen>
  );
}
