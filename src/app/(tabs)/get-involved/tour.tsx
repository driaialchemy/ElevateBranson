import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Hero } from '@/components/Hero';
import { openExternal, openHref } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { availableTourDates, givingDetails, tourFormTarget } from '@/content/getInvolved';
import { useContent } from '@/content/client';
import { tokens } from '@/theme/tokens';

const bodyStyle = { color: tokens.color.text, fontFamily: tokens.font.family.body, fontSize: tokens.font.size.body, lineHeight: tokens.font.lineHeight.body } as const;

function isoDateAfter(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export default function TourScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { data } = useContent();
  const page = data.pages?.find((item) => item.slug === 'schedule-a-tour');
  const dates = availableTourDates(isoDateAfter(1), 30, givingDetails.tourHolidays);
  return (
    <Screen>
      <Hero alt={page?.heroImage?.alt ?? 'Elevate Branson campus'} imageKey="hero" imageUrl={page?.heroImage?.url} title="Schedule a Tour" subtitle="Come see how Elevate Branson serves neighbors and families." />
      <Text style={bodyStyle}>{givingDetails.tourDays}</Text>
      <Text accessibilityRole="header" style={headingStyle}>Available weekdays</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space.xs }}>
        {dates.map((date) => <Pressable key={date} accessibilityLabel={`Tour date ${date}`} accessibilityRole="button" accessibilityState={{ selected: selectedDate === date }} onPress={() => setSelectedDate(date)} style={[chipStyle, selectedDate === date ? { backgroundColor: tokens.color.primary } : null]}><Text style={[bodyStyle, selectedDate === date ? { color: tokens.color.onPrimary } : null]}>{date}</Text></Pressable>)}
      </View>
      <Text accessibilityRole="header" style={headingStyle}>Available time slots</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space.xs }}>
        {givingDetails.tourTimes.map((time) => <Pressable key={time} accessibilityLabel={`Tour time ${time}`} accessibilityRole="button" accessibilityState={{ selected: selectedTime === time }} onPress={() => setSelectedTime(time)} style={[chipStyle, selectedTime === time ? { backgroundColor: tokens.color.primary } : null]}><Text style={[bodyStyle, selectedTime === time ? { color: tokens.color.onPrimary } : null]}>{time}</Text></Pressable>)}
      </View>
      {selectedDate || selectedTime ? <Text style={bodyStyle}>Selected: {selectedDate || 'choose a weekday'}{selectedTime ? ` at ${selectedTime}` : ''}. Enter your final request on the website form.</Text> : null}
      <Card title="Request a tour" body="The website form collects your name, phone, email, requested date and time, and any details for your visit. Your information stays on the Elevate Branson website." />
      <Button label="Request a tour on the website" onPress={() => { const target = tourFormTarget(); if (target.startsWith('http')) openExternal(target); else openHref(target); }} />
    </Screen>
  );
}

const headingStyle = { ...bodyStyle, fontFamily: tokens.font.family.heading, fontSize: tokens.font.size.header, lineHeight: tokens.font.lineHeight.header } as const;
const chipStyle = { alignItems: 'center' as const, backgroundColor: tokens.color.surface, borderColor: tokens.color.border, borderRadius: tokens.buttonRadius, borderWidth: 1, justifyContent: 'center' as const, minHeight: tokens.tapTarget, paddingHorizontal: tokens.space.sm };
