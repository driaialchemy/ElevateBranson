import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { PdfSheetCard } from '@/components/PdfSheetCard';
import { ContentNotice } from '@/components/ContentNotice';
import { EmptyState } from '@/components/EmptyState';
import { openCall, openMap } from '@/components/openLink';
import { Screen } from '@/components/Screen';
import { useContent } from '@/content/client';
import { freshnessNote } from '@/content/freshness';
import { pdfSheets } from '@/content/pdfSheets';
import { filterResources, resourceCategories, visibleHousing } from '@/content/query';
import { tokens } from '@/theme/tokens';

function withNote(body: string, lastVerified?: string) {
  const note = freshnessNote(lastVerified);
  return note ? `${body}\n${note}` : body;
}

export default function ResourcesScreen() {
  const { data } = useContent();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = resourceCategories(data.resources);
  const visible = filterResources(data.resources, query, category);
  const housing = visibleHousing(data.housingListings);

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
        Partner groups for referrals, from the June 2026 Area Resources sheet. Search by name or choose a category. Details may have changed, so call to confirm.
      </Text>
      {pdfSheets.map((sheet) => (
        <PdfSheetCard key={sheet.id} sheet={sheet} />
      ))}
      <TextInput
        accessibilityLabel="Search partner groups"
        onChangeText={setQuery}
        placeholder="Search partner groups"
        placeholderTextColor={tokens.color.textMuted}
        style={{
          backgroundColor: tokens.color.surface,
          borderColor: tokens.color.border,
          borderRadius: tokens.radius,
          borderWidth: 1,
          color: tokens.color.text,
          fontFamily: tokens.font.family.body,
          fontSize: tokens.font.size.body,
          minHeight: tokens.tapTarget,
          paddingHorizontal: tokens.space.md,
        }}
        value={query}
      />
      {data.resources.length > 0 ? (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.space.sm }}>
          {categories.map((name) => {
            const selected = name === category;
            return (
              <Pressable
                accessibilityLabel={name}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                key={name}
                onPress={() => setCategory(name)}
                style={{
                  alignItems: 'center',
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
                  {name}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ) : null}
      {visible.length === 0 ? (
        <EmptyState
          body="Staff have not published the partner list yet. The website says there are more than 150 groups and does not name them."
          title="No partner groups yet"
        />
      ) : (
        visible.map((resource) => (
          <View key={resource.id} style={{ gap: tokens.space.sm }}>
            <Card
              body={withNote(`${resource.category}. ${resource.summary}`, resource.lastVerified)}
              title={resource.name}
            />
            {resource.phone ? (
              <Button label={`Call ${resource.name}`} onPress={() => openCall(resource.phone)} />
            ) : null}
            {resource.address ? (
              <Button label={`Open ${resource.name} in Maps`} onPress={() => openMap(resource.address)} />
            ) : null}
          </View>
        ))
      )}
      {data.housingListings.length === 0 ? (
        <EmptyState
          body="Staff have not added the housing list yet. Public organization names, phones, and addresses belong here."
          title="Affordable housing"
        />
      ) : housing.length === 0 ? (
        <EmptyState
          body="Housing listings need a last-checked date before they show here."
          title="Affordable housing"
        />
      ) : (
        housing.map((listing) => (
          <View key={listing.id} style={{ gap: tokens.space.sm }}>
            <Card body={withNote(`${listing.address}. ${listing.summary}`, listing.lastVerified)} title={listing.name} />
            {listing.phone ? (
              <Button label={`Call ${listing.name}`} onPress={() => openCall(listing.phone)} />
            ) : null}
            {listing.address ? (
              <Button label={`Open ${listing.name} in Maps`} onPress={() => openMap(listing.address)} />
            ) : null}
          </View>
        ))
      )}
    </Screen>
  );
}
