import type { TextStyle } from 'react-native';

import { fontFamily } from './fonts';

/**
 * Type roles (PRD §8). Sizes are starting points at the default text size; they scale with the
 * iPhone's Dynamic Type setting automatically, so never fix heights around text.
 */
export const typography = {
  wordmark: { fontFamily: fontFamily.wordmark, fontSize: 34, letterSpacing: 0.5 },
  display: { fontFamily: fontFamily.displayItalic, fontSize: 38, lineHeight: 44 },
  prompt: { fontFamily: fontFamily.displayItalic, fontSize: 30, lineHeight: 36 },
  heading: { fontFamily: fontFamily.displayItalic, fontSize: 28, lineHeight: 34 },
  reading: { fontFamily: fontFamily.reading, fontSize: 18, lineHeight: 28 },
  body: { fontFamily: fontFamily.sans, fontSize: 16, lineHeight: 22 },
  meta: { fontFamily: fontFamily.sans, fontSize: 13, lineHeight: 18, letterSpacing: 1.2 },
  label: {
    fontFamily: fontFamily.typewriter,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
} as const satisfies Record<string, TextStyle>;

export type TypeRole = keyof typeof typography;
