export type PdfLanguage = 'en' | 'es';

export type PdfSheet = {
  id: 'housing' | 'area-resources';
  title: string;
  /** First day of the sheet's month. */
  lastVerified: string;
  urls: Record<PdfLanguage, string>;
};

const uploads = 'https://elevatebranson.org/wp-content/uploads';

export const pdfSheets: PdfSheet[] = [
  {
    id: 'housing',
    title: 'Housing Information Sheet',
    lastVerified: '2026-03-01',
    urls: {
      en: `${uploads}/2026/03/HousingInformationSheet_March2026.pdf`,
      es: `${uploads}/2026/03/HousingInformationSheet_March2026_Spanish.pdf`,
    },
  },
  {
    id: 'area-resources',
    title: 'Area Resources sheet',
    lastVerified: '2026-06-01',
    urls: {
      en: `${uploads}/2026/07/Area-Resources-June-2026.pdf`,
      es: `${uploads}/2026/07/Area-Resources-Spanish-Version-June-2026.pdf`,
    },
  },
];

export const pdfLanguageKey = 'elevate-branson-pdf-language-v1';

export type KeyValueStore = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
};

export async function loadPdfLanguage(store: KeyValueStore): Promise<PdfLanguage> {
  try {
    return (await store.getItem(pdfLanguageKey)) === 'es' ? 'es' : 'en';
  } catch {
    return 'en';
  }
}

export async function savePdfLanguage(store: KeyValueStore, language: PdfLanguage): Promise<void> {
  try {
    await store.setItem(pdfLanguageKey, language);
  } catch {
    // The choice just will not be remembered.
  }
}

export function sheetMonth(lastVerified: string): string {
  const [year, month] = lastVerified.split('-').map(Number);
  const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${names[month - 1] ?? ''} ${year}`.trim();
}
