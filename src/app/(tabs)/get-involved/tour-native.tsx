import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { HoneypotField } from '@/components/HoneypotField';
import { PrivacyLine } from '@/components/PrivacyLine';
import { Screen } from '@/components/Screen';
import { TextField } from '@/components/TextField';
import { availableTourDates, givingDetails, isTourSlotAllowed } from '@/content/getInvolved';
import { tourSchema } from '@/forms/schema';
import { useSubmit } from '@/forms/useSubmit';
import { tokens } from '@/theme/tokens';

const bodyStyle = { color: tokens.color.text, fontFamily: tokens.font.family.body, fontSize: tokens.font.size.body, lineHeight: tokens.font.lineHeight.body } as const;
const chipStyle = { alignItems: 'center' as const, backgroundColor: tokens.color.surface, borderColor: tokens.color.border, borderRadius: tokens.buttonRadius, borderWidth: 1, justifyContent: 'center' as const, minHeight: tokens.tapTarget, paddingHorizontal: tokens.space.sm };

function isoToday() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function Choices({ items, selected, pick, label, allowed }: { items: readonly string[]; selected: string; pick: (value: string) => void; label: string; allowed: (value: string) => boolean }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space.xs }}>
      {items.map((value) => {
        const enabled = allowed(value);
        return (
          <Pressable
            accessibilityLabel={`${label} ${value}`}
            accessibilityRole="button"
            accessibilityState={{ disabled: !enabled, selected: selected === value }}
            disabled={!enabled}
            key={value}
            onPress={() => pick(value)}
            style={[chipStyle, selected === value ? { backgroundColor: tokens.color.primary } : null, enabled ? null : { opacity: 0.4 }]}>
            <Text style={[bodyStyle, selected === value ? { color: tokens.color.onPrimary } : null]}>{value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TourNativeScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [groupSize, setGroupSize] = useState('1');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [company, setCompany] = useState('');
  const { errors, notice, pending, submit } = useSubmit(tourSchema);
  const dates = availableTourDates(isoToday(), 31, givingDetails.tourHolidays);

  if (notice) {
    return (
      <Screen>
        <Card body={notice} title="Tour request received" />
      </Screen>
    );
  }

  const slotOk = date !== '' && time !== '' && isTourSlotAllowed(date, time, new Date());

  return (
    <Screen>
      <Text style={bodyStyle}>{givingDetails.tourDays}</Text>
      <TextField error={errors.name} label="Name" onChangeText={setName} value={name} />
      <TextField error={errors.phone} keyboardType="phone-pad" label="Phone" onChangeText={setPhone} value={phone} />
      <TextField error={errors.email} keyboardType="email-address" label="Email" onChangeText={setEmail} value={email} />
      <TextField error={errors.groupSize} keyboardType="number-pad" label="How many people" onChangeText={setGroupSize} value={groupSize} />
      <Text accessibilityRole="header" style={bodyStyle}>Weekday</Text>
      <Choices allowed={() => true} items={dates} label="Tour date" pick={setDate} selected={date} />
      <Text accessibilityRole="header" style={bodyStyle}>Time</Text>
      <Choices
        allowed={(value) => !date || isTourSlotAllowed(date, value, new Date())}
        items={givingDetails.tourTimes}
        label="Tour time"
        pick={setTime}
        selected={time}
      />
      {errors.preferred ? <Text accessibilityRole="alert" style={bodyStyle}>Choose a weekday and a time at least 24 hours from now.</Text> : null}
      <TextField label="Details for your visit, optional" multiline onChangeText={setDetails} value={details} />
      <HoneypotField onChangeText={setCompany} value={company} />
      <PrivacyLine />
      {errors.form ? <Text accessibilityRole="alert" style={bodyStyle}>{errors.form}</Text> : null}
      <Button
        label={pending ? 'Sending' : 'Request a tour'}
        onPress={() =>
          void submit(
            { type: 'tour', name, phone, email, groupSize, details, preferred: date && time ? `${date} at ${time}` : '', company },
            slotOk ? {} : { preferred: 'Choose a date and time.' },
          )
        }
      />
    </Screen>
  );
}
