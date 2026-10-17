/**
 * Only source of colors and font settings.
 * Screens import these tokens. They do not set their own colors or fonts.
 */
export const tokens = {
  color: {
    text: '#174A5B',
    textMuted: '#3A3A3A',
    background: '#F3F6F6',
    surface: '#FFFFFF',
    primary: '#174A5B',
    onPrimary: '#FFFFFF',
    border: '#D5DEE0',
    error: '#7A1F1F',
    onError: '#FFFFFF',
    /** Site green. Decorative only: it fails 4.5:1 on white. */
    green: '#6BA539',
    /** Site sky blue. Decorative only: it fails 4.5:1 on white. */
    sky: '#00A9CE',
  },
  font: {
    /**
     * The website uses Gotham and Avenir. Those files are not in the repo.
     * Undefined uses the phone's system font until official files arrive.
     */
    family: {
      heading: undefined as string | undefined,
      body: undefined as string | undefined,
    },
    size: {
      body: 16,
      header: 20,
      title: 28,
    },
    lineHeight: {
      body: 24,
      header: 28,
      title: 36,
    },
  },
  space: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
  },
  radius: 12,
  tapTarget: 44,
} as const;
