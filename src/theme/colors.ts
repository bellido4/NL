/**
 * Identidad visual Nevada Lubricantes.
 * NUNCA usar colores fuera de esta paleta.
 */

export const palette = {
  primary: '#0B132B',
  secondary: '#1C2541',
  blueGray: '#3A506B',
  turquoise: '#5BC0BE',
  turquoiseLight: '#6FFFE9',

  white: '#FFFFFF',
  gray50: '#F8FAFC',
  gray200: '#E2E8F0',
  gray300: '#CBD5E1',
  gray500: '#64748B',

  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
} as const;

export const gradients = {
  turquoise: [palette.turquoise, palette.turquoiseLight] as const,
  dark: [palette.primary, palette.secondary] as const,
  hero: [palette.primary, palette.blueGray, palette.turquoise] as const,
};

export const lightTheme = {
  mode: 'light' as const,
  background: palette.gray50,
  surface: palette.white,
  surfaceElevated: palette.white,
  border: palette.gray200,
  textPrimary: palette.primary,
  textSecondary: palette.gray500,
  accent: palette.turquoise,
  accentAlt: palette.turquoiseLight,
  ...palette,
};

export const darkTheme = {
  mode: 'dark' as const,
  background: palette.primary,
  surface: palette.secondary,
  surfaceElevated: '#243352',
  border: '#2A3B5C',
  textPrimary: palette.white,
  textSecondary: palette.gray300,
  accent: palette.turquoise,
  accentAlt: palette.turquoiseLight,
  ...palette,
};

export type AppTheme = typeof lightTheme;
