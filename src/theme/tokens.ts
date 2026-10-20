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
    /** Site olive. Decorative only: it fails 4.5:1 for text on white. */
    accent: '#7DA34B',
    /** Decorative volunteer card accents; never use these colors for body text. */
    volunteerCards: ['#007C91', '#8C2761', '#A94300', '#8C6600'],
    /** Area outside the centered column on a wide screen. */
    canvas: '#E7EEEF',
    /** Dark scrim behind hero text. White on this teal passes 4.5:1. */
    overlay: '#174A5B',
  },
  font: {
    /**
     * The website uses Gotham and Avenir. Those files are not licensed for the app.
     * Montserrat and Nunito Sans are the free stand-ins loaded in the root layout.
     */
    family: {
      heading: 'Montserrat_600SemiBold',
      body: 'NunitoSans_400Regular',
    },
    size: {
      body: 16,
      header: 20,
      title: 28,
      hero: 32,
    },
    lineHeight: {
      body: 24,
      header: 28,
      title: 36,
      hero: 40,
    },
  },
  space: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: 12,
  /** Website buttons use a 5px corner. */
  buttonRadius: 5,
  tapTarget: 44,
  layout: {
    maxWidth: 720,
  },
  shadow: {
    color: '#174A5B',
    opacity: 0.12,
    radius: 8,
    offsetY: 2,
  },
} as const;
