import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { HoneypotField } from '@/components/HoneypotField';
import { PrivacyLine } from '@/components/PrivacyLine';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { contactPrograms, contactSchema } from '@/forms/schema';
import { useSubmit } from '@/forms/useSubmit';
import { tokens } from '@/theme/tokens';

const bodyStyle = { color: tokens.color.text, fontFamily: tokens.font.family.body, fontSize: tokens.font.size.body, lineHeight: tokens.font.lineHeight.body } as const;

export default function ContactFormScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [program, setProgram] = useState<string>('General');
  const [message, setMessage] = useState('');
  const [company, setCompany] = useState('');
  const { errors, notice, pending, submit } = useSubmit(contactSchema);

  if (notice) {
    return (
      <Screen>
        <Card body={notice} title="Message received" />
      </Screen>
    );
  }

  return (
    <Screen>
      <TextField error={errors.name} label="Name" onChangeText={setName} value={name} />
      <TextField error={errors.email} keyboardType="email-address" label="Email" onChangeText={setEmail} value={email} />
      <TextField keyboardType="phone-pad" label="Phone, if you want a call" onChangeText={setPhone} value={phone} />
      <Text accessibilityRole="header" style={bodyStyle}>Program</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space.sm }}>
        {contactPrograms.map((item) => {
          const selected = item === program;
          return (
            <Pressable
              accessibilityLabel={`Program ${item}`}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={item}
              onPress={() => setProgram(item)}
              style={{ alignItems: 'center', backgroundColor: selected ? tokens.color.primary : tokens.color.surface, borderColor: tokens.color.border, borderRadius: tokens.radius, borderWidth: 1, justifyContent: 'center', minHeight: tokens.tapTarget, paddingHorizontal: tokens.space.md }}>
              <Text style={[bodyStyle, selected ? { color: tokens.color.onPrimary } : null]}>{item}</Text>
            </Pressable>
          );
        })}
      </View>
      <TextField error={errors.message} label="Message" multiline onChangeText={setMessage} value={message} />
      <HoneypotField onChangeText={setCompany} value={company} />
      <PrivacyLine />
      {errors.form ? <Text accessibilityRole="alert" style={bodyStyle}>{errors.form}</Text> : null}
      <Button label={pending ? 'Sending' : 'Send message'} onPress={() => void submit({ type: 'contact', name, email, phone, program, message, company })} />
    </Screen>
  );
}
