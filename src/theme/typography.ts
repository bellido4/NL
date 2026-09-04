export const fontFamily = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
};

export const typeScale = {
  display: { fontSize: 32, lineHeight: 40, fontFamily: fontFamily.extrabold },
  h1: { fontSize: 26, lineHeight: 32, fontFamily: fontFamily.bold },
  h2: { fontSize: 22, lineHeight: 28, fontFamily: fontFamily.bold },
  h3: { fontSize: 18, lineHeight: 24, fontFamily: fontFamily.semibold },
  bodyLarge: { fontSize: 16, lineHeight: 24, fontFamily: fontFamily.regular },
  body: { fontSize: 14, lineHeight: 20, fontFamily: fontFamily.regular },
  bodyMedium: { fontSize: 14, lineHeight: 20, fontFamily: fontFamily.medium },
  caption: { fontSize: 12, lineHeight: 16, fontFamily: fontFamily.medium },
  button: { fontSize: 15, lineHeight: 20, fontFamily: fontFamily.semibold },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
};
