import { CourierPrime_400Regular } from '@expo-google-fonts/courier-prime/400Regular';
import { InstrumentSerif_400Regular_Italic } from '@expo-google-fonts/instrument-serif/400Regular_Italic';
import { Inter_200ExtraLight } from '@expo-google-fonts/inter/200ExtraLight';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_500Medium } from '@expo-google-fonts/inter/500Medium';
import { SourceSerif4_400Regular } from '@expo-google-fonts/source-serif-4/400Regular';
import { SourceSerif4_400Regular_Italic } from '@expo-google-fonts/source-serif-4/400Regular_Italic';

// Import each weight from its own path: the package root would bundle every weight.
/**
 * Placeholder fonts (free Google Fonts). See docs/DESIGN.md for the choices and how to swap
 * in licensed fonts later: only this file and `fontFamily` below should need to change.
 */
export const fontAssets = {
  InstrumentSerif_400Regular_Italic,
  SourceSerif4_400Regular,
  SourceSerif4_400Regular_Italic,
  Inter_200ExtraLight,
  Inter_400Regular,
  Inter_500Medium,
  CourierPrime_400Regular,
};

type FontName = keyof typeof fontAssets;

export const fontFamily = {
  /** Large expressive italic serif: Home statements, prompts, Archive heading. */
  displayItalic: 'InstrumentSerif_400Regular_Italic',
  /** Highly readable roman serif: the user's own writing. */
  reading: 'SourceSerif4_400Regular',
  readingItalic: 'SourceSerif4_400Regular_Italic',
  /** Thin lowercase "between" wordmark. */
  wordmark: 'Inter_200ExtraLight',
  /** Clean, spaced sans: navigation and collection metadata. */
  sans: 'Inter_400Regular',
  sansMedium: 'Inter_500Medium',
  /** Restrained typewriter face: ticket labels, FIELD NOTE, entry numbers, dates. */
  typewriter: 'CourierPrime_400Regular',
} as const satisfies Record<string, FontName>;
