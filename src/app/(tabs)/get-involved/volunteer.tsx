import { Linking, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Hero } from '@/components/Hero';
import { openCall, openExternal, openHref } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { volunteerFormTarget, volunteerImages, volunteerLinks, volunteerOpportunities } from '@/content/getInvolved';
import { tokens } from '@/theme/tokens';

const colors = tokens.color.volunteerCards;
export default function VolunteerScreen() {
  const { data } = useContent();
  const page = data.pages?.find((item) => item.slug === 'volunteer');
  return (
    <Screen>
      <Hero alt={page?.heroImage?.alt ?? 'Elevate Branson volunteers'} imageKey="hero" imageUrl={page?.heroImage?.url} title="Volunteer" subtitle={page?.summary ?? 'Give your time and help neighbors move forward.'} />
      <Text style={bodyStyle}>Choose an opportunity and open its secure application on the Elevate Branson website.</Text>
      <View style={{ gap: tokens.space.md }}>
        {volunteerOpportunities.map((item, index) => (
          <View key={item.id} style={{ gap: tokens.space.xs }}>
            <Card title={item.title} body={`${item.schedule}\n\n${item.description}\n\nAge: ${item.ageRules}\nGroup size: ${item.groupSize}`} imageKey={volunteerImages[item.id]} accentColor={colors[index % colors.length]} />
            <Button label={`Volunteer: ${item.title}`} onPress={() => { const target = volunteerFormTarget(item); if (target.startsWith('http')) openExternal(target); else openHref(target); }} />
          </View>
        ))}
      </View>
      <Button label="Code of Conduct and Release Waiver (PDF)" onPress={() => openExternal(volunteerLinks.conduct)} variant="secondary" />
      <Button label="Full volunteer opportunities (PDF)" onPress={() => openExternal(volunteerLinks.opportunities)} variant="secondary" />
      <Button label="Rewards Program" onPress={() => openHref(volunteerLinks.rewards)} variant="secondary" />
      <Button label="Meet Our Volunteers" onPress={() => openHref(volunteerLinks.profiles)} variant="secondary" />
      <Button label="Give 5" onPress={() => openExternal(volunteerLinks.give5)} variant="secondary" />
      <Text style={bodyStyle}>Days and times may change; check Facebook.</Text>
      <Button label="Elevate Branson on Facebook" onPress={() => openExternal(volunteerLinks.facebook)} variant="secondary" />
      <Button label={`Call ${volunteerLinks.phone}`} onPress={() => openCall(volunteerLinks.phone)} />
      <Button label={`Email ${volunteerLinks.email}`} onPress={() => void Linking.openURL(`mailto:${volunteerLinks.email}`)} variant="secondary" />
    </Screen>
  );
}

const bodyStyle = { color: tokens.color.text, fontFamily: tokens.font.family.body, fontSize: tokens.font.size.body, lineHeight: tokens.font.lineHeight.body } as const;
