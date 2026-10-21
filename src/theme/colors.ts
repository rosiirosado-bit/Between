/**
 * Color tokens (PRD §8). Components use `colors` (semantic roles), never raw hex values.
 *
 * Contrast notes (WCAG ratios, checked in __tests__/contrast.test.ts):
 * - Transit orange is 4.07:1 on both near black and ivory: fine for icons, rules, large text
 *   and accents, NOT for small body text. Use `accentOnDark` for small orange text on dark.
 * - Graphite is 6.04:1 on ivory but only 2.74:1 on near black, so dark screens use
 *   `textMutedOnDark` instead.
 */
export const palette = {
  nearBlack: '#111113',
  ivory: '#F3F0E8',
  transitOrange: '#C84D1B',
  graphite: '#5C5A56',
  // Derived for contrast; refine during the visual pass (BUILD_PLAN Step 9).
  stone: '#A8A49C',
  emberOrange: '#E0693A',
} as const;

export const colors = {
  /** Home, Archive, collection covers. */
  surfaceDark: palette.nearBlack,
  /** The writing screen. */
  surfacePaper: palette.ivory,

  textOnDark: palette.ivory,
  textMutedOnDark: palette.stone,
  textOnPaper: palette.nearBlack,
  textMutedOnPaper: palette.graphite,

  /** Small actions and editorial moments only. */
  accent: palette.transitOrange,
  /** Orange that stays readable as small text on dark surfaces. */
  accentOnDark: palette.emberOrange,

  ruleOnDark: palette.graphite,
  ruleOnPaper: palette.graphite,
} as const;

export type ColorToken = keyof typeof colors;
