import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { openExternal } from '@/components/openLink';
import { freshnessNote } from '@/content/freshness';
import { loadPdfLanguage, type PdfLanguage, type PdfSheet, savePdfLanguage, sheetMonth } from '@/content/pdfSheets';
import { tokens } from '@/theme/tokens';

const choices: { language: PdfLanguage; label: string }[] = [
  { language: 'en', label: 'English' },
  { language: 'es', label: 'Español' },
];

export function PdfSheetCard({ sheet }: { sheet: PdfSheet }) {
  const [language, setLanguage] = useState<PdfLanguage>('en');

  useEffect(() => {
    void loadPdfLanguage(AsyncStorage).then(setLanguage);
  }, []);

  const choose = (next: PdfLanguage) => {
    setLanguage(next);
    void savePdfLanguage(AsyncStorage, next);
  };
  const note = freshnessNote(sheet.lastVerified);
  const body = `${sheetMonth(sheet.lastVerified)} edition. ${note}`.trim();

  return (
    <View style={{ gap: tokens.space.sm }}>
      <Card body={body} title={sheet.title} />
      <View accessibilityRole="radiogroup" style={{ flexDirection: 'row', gap: tokens.space.sm }}>
        {choices.map((choice) => {
          const selected = choice.language === language;
          return (
            <Pressable
              accessibilityLabel={`${sheet.title}: ${choice.label}`}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              key={choice.language}
              onPress={() => choose(choice.language)}
              style={{
                alignItems: 'center',
                backgroundColor: selected ? tokens.color.primary : tokens.color.surface,
                borderColor: tokens.color.primary,
                borderRadius: tokens.radius,
                borderWidth: 2,
                flex: 1,
                justifyContent: 'center',
                minHeight: tokens.tapTarget,
              }}>
              <Text
                style={{
                  color: selected ? tokens.color.onPrimary : tokens.color.text,
                  fontFamily: tokens.font.family.body,
                  fontSize: tokens.font.size.body,
                  lineHeight: tokens.font.lineHeight.body,
                }}>
                {choice.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Button
        label={language === 'es' ? 'Ver la hoja completa' : 'View full sheet'}
        onPress={() => openExternal(sheet.urls[language])}
      />
    </View>
  );
}
