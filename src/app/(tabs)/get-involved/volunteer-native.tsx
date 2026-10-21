import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Switch, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { HoneypotField } from '@/components/HoneypotField';
import { openExternal } from '@/components/openLink';
import { PrivacyLine } from '@/components/PrivacyLine';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { volunteerLinks, volunteerOpportunities } from '@/content/getInvolved';
import { volunteerSchema } from '@/forms/schema';
import { useSubmit } from '@/forms/useSubmit';
import { tokens } from '@/theme/tokens';

const bodyStyle = { color: tokens.color.text, fontFamily: tokens.font.family.body, fontSize: tokens.font.size.body, lineHeight: tokens.font.lineHeight.body } as const;

export default function VolunteerNativeScreen() {
  const { opportunity: id } = useLocalSearchParams<{ opportunity?: string }>();
  const item = volunteerOpportunities.find((entry) => entry.id === id) ?? volunteerOpportunities[0];
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [company, setCompany] = useState('');
  const { errors, notice, pending, submit } = useSubmit(volunteerSchema);

  if (notice) {
    return (
      <Screen>
        <Card body={notice} title="Thank you for volunteering" />
      </Screen>
    );
  }

  return (
    <Screen>
      <Card body={`${item.schedule}\n\n${item.description}`} title={item.title} />
      <TextField error={errors.name} label="First name" onChangeText={setFirstName} value={firstName} />
      <TextField label="Last name" onChangeText={setLastName} value={lastName} />
      <TextField error={errors.email} keyboardType="email-address" label="Email" onChangeText={setEmail} value={email} />
      <TextField keyboardType="phone-pad" label="Phone, optional" onChangeText={setPhone} value={phone} />
      <TextField label="Questions, optional" multiline onChangeText={setMessage} value={message} />
      <Button label="Read the Code of Conduct (PDF)" onPress={() => openExternal(volunteerLinks.conduct)} variant="secondary" />
      <View style={{ alignItems: 'center', flexDirection: 'row', gap: tokens.space.md, minHeight: tokens.tapTarget }}>
        <Switch
          accessibilityLabel="I have read and agree to the Code of Conduct"
          onValueChange={setAccepted}
          thumbColor={tokens.color.surface}
          trackColor={{ false: tokens.color.border, true: tokens.color.primary }}
          value={accepted}
        />
        <Text style={[bodyStyle, { flex: 1 }]}>I have read and agree to the Code of Conduct.</Text>
      </View>
      {errors.conductAccepted ? <Text accessibilityRole="alert" style={bodyStyle}>{errors.conductAccepted}</Text> : null}
      <HoneypotField onChangeText={setCompany} value={company} />
      <PrivacyLine />
      {errors.form ? <Text accessibilityRole="alert" style={bodyStyle}>{errors.form}</Text> : null}
      <Button
        label={pending ? 'Sending' : 'Send volunteer request'}
        onPress={() =>
          void submit({
            type: 'volunteer',
            program: item.title,
            name: `${firstName} ${lastName}`.trim(),
            email,
            phone,
            message,
            conductAccepted: accepted ? true : undefined,
            company,
          })
        }
      />
    </Screen>
  );
}
