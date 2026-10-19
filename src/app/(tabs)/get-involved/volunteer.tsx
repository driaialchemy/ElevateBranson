import { useState } from 'react';
import { Pressable, Text } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ContentNotice } from '@/components/ContentNotice';
import { HoneypotField } from '@/components/HoneypotField';
import { PrivacyLine } from '@/components/PrivacyLine';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { useContent } from '@/content/client';
import { deliverForm } from '@/forms/deliver';
import { fieldErrors, volunteerSchema } from '@/forms/schema';
import { useNetwork } from '@/network/NetworkProvider';
import { tokens } from '@/theme/tokens';

export default function VolunteerScreen() {
  const { data } = useContent();
  const { online } = useNetwork();
  const [program, setProgram] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');
  const [pending, setPending] = useState(false);

  async function submit() {
    const parsed = volunteerSchema.safeParse({
      type: 'volunteer',
      program,
      name,
      email,
      phone,
      message,
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
      <Text
        style={{
          color: tokens.color.text,
          fontFamily: tokens.font.family.body,
          fontSize: tokens.font.size.body,
          lineHeight: tokens.font.lineHeight.body,
        }}>
        Choose a program and tell us how to reach you.
      </Text>
      {data.programs.map((item) => {
        const selected = program === item.name;
        return (
          <Pressable
            accessibilityLabel={item.name}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            key={item.id}
            onPress={() => setProgram(item.name)}
            style={{
              backgroundColor: selected ? tokens.color.primary : tokens.color.surface,
              borderColor: tokens.color.border,
              borderRadius: tokens.radius,
              borderWidth: 1,
              justifyContent: 'center',
              minHeight: tokens.tapTarget,
              paddingHorizontal: tokens.space.md,
            }}>
            <Text
              style={{
                color: selected ? tokens.color.onPrimary : tokens.color.text,
                fontFamily: tokens.font.family.body,
                fontSize: tokens.font.size.body,
                lineHeight: tokens.font.lineHeight.body,
              }}>
              {item.name}
            </Text>
          </Pressable>
        );
      })}
      {errors.program ? (
        <Text
          accessibilityRole="alert"
          style={{
            color: tokens.color.error,
            fontFamily: tokens.font.family.body,
            fontSize: tokens.font.size.body,
            lineHeight: tokens.font.lineHeight.body,
          }}>
          {errors.program}
        </Text>
      ) : null}
      <TextField error={errors.name} label="Name" onChangeText={setName} value={name} />
      <TextField
        error={errors.email}
        keyboardType="email-address"
        label="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextField keyboardType="phone-pad" label="Phone, if you want" onChangeText={setPhone} value={phone} />
      <TextField error={errors.message} label="How you would like to help" multiline onChangeText={setMessage} value={message} />
      <HoneypotField onChangeText={setCompany} value={company} />
      <PrivacyLine />
      <Button label={pending ? 'Sending' : 'Send to the coordinator'} onPress={() => void submit()} />
    </Screen>
  );
}
