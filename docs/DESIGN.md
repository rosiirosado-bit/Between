# Design system notes

Working notes for the Between visual system (PRD §8). The code version lives in `src/theme/`.
Everything here is a starting point. It gets refined against the founder's mockup in BUILD_PLAN Step 9.

## Color tokens

| Token | Hex | Use |
|---|---|---|
| Near black | `#111113` | Home, Archive and collection surfaces; text on ivory |
| Warm ivory | `#F3F0E8` | Writing surface; text on dark |
| Transit orange | `#C84D1B` | Small actions and editorial moments only |
| Graphite | `#5C5A56` | Secondary text on ivory; thin rules |
| Stone *(derived)* | `#A8A49C` | Secondary text on dark (graphite is too faint there) |
| Ember orange *(derived)* | `#E0693A` | Orange that has to work as small text on dark, e.g. the selected tab |

### Contrast (WCAG)

| Pair | Ratio | OK for |
|---|---:|---|
| Ivory on near black (and reverse) | 16.6 : 1 | Everything |
| Graphite on ivory | 6.0 : 1 | Small text |
| Stone on near black | 7.6 : 1 | Small text |
| Ember orange on near black | 5.6 : 1 | Small text |
| Transit orange on near black or ivory | 4.1 : 1 | Large text (about 24pt and up), icons, rules, accents. **Not small text.** |
| Graphite on near black | 2.7 : 1 | Nothing that carries meaning |

`src/theme/__tests__/contrast.test.ts` enforces these, so a color change that breaks readability fails the tests.

## Type roles and placeholder fonts

All four fonts are free Google Fonts under the SIL Open Font License, which allows commercial use in an app.
They're placeholders until the founder picks licensed fonts (PRD §14.4).

| Role | Placeholder font | Used for | Why this one |
|---|---|---|---|
| Display italic serif | **Instrument Serif Italic** | Home statements, prompts, Archive heading | Expressive, editorial, magazine feel |
| Reading serif | **Source Serif 4** (Regular, Italic) | The user's own writing | Built for long reading on screens |
| Wordmark | **Inter ExtraLight** | Thin lowercase "between" | Stand-in until a real wordmark is drawn |
| Spaced sans | **Inter** (Regular, Medium) | Navigation, collection metadata, buttons | Very legible at small sizes |
| Typewriter mono | **Courier Prime** | "FIELD NOTE", ticket stubs, entry numbers, dates | Restrained typewriter look without heavy distortion |

Alternative to try for the typewriter role: **Special Elite** has the "uneven ink" the PRD mentions, but it may be too
distressed for small labels.

### Swapping in licensed fonts later

1. Put the font files in `assets/fonts/`.
2. Update `src/theme/fonts.ts`: point `fontAssets` at the new files and rename the entries in `fontFamily`.
3. Nothing else should change, because screens only use type roles (`variant="prompt"` and so on), never font names.

### Sizes and Dynamic Type

Starting sizes are in `src/theme/typography.ts`. All text scales with the iPhone's text-size setting.
Layouts must never fix a height around text, or large text sizes would clip.

## Rules carried from the PRD

- Orange marks small actions or editorial moments. No pink, saturated yellow or lipstick motifs.
- The user's writing is plain, readable serif. No typewriter distortion, texture or motion behind it.
- Handwritten details: at most one or two per screen. They never overlap input or controls and are hidden from VoiceOver.
- The look is fixed (decision D10): dark Home and Archive, ivory Write screen, whatever the phone's dark/light setting.
