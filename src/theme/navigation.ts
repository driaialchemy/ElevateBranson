import { tokens } from '@/theme/tokens';

export const stackScreenOptions = {
  headerStyle: { backgroundColor: tokens.color.surface },
  headerTintColor: tokens.color.primary,
  headerTitleStyle: {
    fontFamily: tokens.font.family.heading,
    fontSize: tokens.font.size.header,
    color: tokens.color.text,
  },
  headerShadowVisible: false,
  headerBackTitle: 'Back',
  contentStyle: { backgroundColor: tokens.color.background },
};
