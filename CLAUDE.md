# CLAUDE.md — Between

Between is a private, editorial journal prompt app ("For the versions of yourself you don't post").
The source of truth is `docs/PRD.md`; the step-by-step roadmap is `docs/BUILD_PLAN.md`.
Decisions made after the PRD are recorded in `docs/DECISIONS.md`. When the PRD and a decision
conflict, the decision wins; when anything else conflicts with the PRD, ask the founder.

The founder is not a developer. Explain things in plain language, give exact step-by-step
instructions for anything they must do themselves, and say clearly what was and wasn't verified.

## Stack

- **Expo (React Native) + TypeScript (strict)**, Expo Router for navigation.
- **Local data:** `expo-sqlite` with an FTS5 index for search. Local-first: the app must work fully offline.
- **Secrets on device:** `expo-secure-store` (tokens only, never journal content).
- **Audio:** `expo-audio`. **Haptics:** `expo-haptics`. **Reminders:** `expo-notifications`.
- **Subscriptions (later):** RevenueCat on top of App Store StoreKit.
- **Accounts & sync (later):** Supabase (Postgres + Row Level Security + Storage), Sign in with Apple.
- **Tests:** Jest + React Native Testing Library. **Lint/format:** ESLint + Prettier.
- **Fonts:** placeholder Google Fonts via `@expo-google-fonts/*` (see `docs/DESIGN.md`). Import each weight
  from its own subpath (`@expo-google-fonts/inter/400Regular`); the package root bundles every weight.
- Keep dependencies few. Ask before adding a library that isn't listed here.
- Add packages with `npx expo install <pkg>` so versions match the SDK. In cloud sessions the Expo API is
  blocked by the network policy, so prefix with `EXPO_OFFLINE=1`.
- Expo changes every SDK. Before using an Expo or React Native API, check the installed package's types or
  the versioned docs (`https://docs.expo.dev/versions/v<major>.0.0/`) rather than relying on memory.
- Native folders (`ios/`, `android/`) are generated. Never create or edit them; configure via `app.json`.

## Folder structure

```
src/
  app/                  Expo Router screens only (thin: layout + wiring)
    (tabs)/             Home, Write, Archive tabs (native iOS tab bar)
    collection/[id].tsx Collection detail
    entry/[id].tsx      Archive entry detail
    settings/           Settings screens (opens as a sheet)
  features/             One folder per feature: catalog, writing, timer, archive,
                        export, voice, transcription, subscription, account, sync, reminders
                        (each holds its components, hooks, logic and __tests__)
  db/                   SQLite schema, migrations, repositories
  components/           Shared UI (buttons, sheets, typography, handwritten marks)
  theme/                Design tokens: colors, type roles, spacing
  strings/              All user-facing copy (en.ts); nothing hard-coded in components
  lib/                  Small generic helpers (dates, ids, logging)
content/catalog.json    Collections and prompts (editorial content, versioned)
assets/                 fonts/, photos/, handwriting/ (SVG)
design/reference/       Founder's mockup and art-direction references
docs/                   PRD, build plan, decisions, design notes, QA reports
```

Import with the `@/` alias (`@/theme`, `@/strings`, `@/components/...`), which points at `src/`.

Put business logic (timer math, progression rules, sync, conflict handling) in plain TypeScript
modules with no React, so it's easy to unit test.

## Non-negotiable rules

### Privacy (PRD §9)
- **Never log, print, send to analytics, or include in crash reports:** entry text, prompt responses,
  transcripts, audio bytes, search terms, or export contents. This includes `console.log`.
  Use `src/lib/log.ts`, which only accepts event names and non-content metadata.
- No advertising or third-party tracking SDKs.
- Never put API keys or service secrets in the app bundle. Server-side keys live in server functions.
- Audio leaves the device only after explicit consent at that moment (transcription).
- Notifications and the app switcher never show journal content.

### Data safety (PRD §7.2, §10)
- A user's writing must never be lost. Save before anything that could lose state
  (backgrounding, navigation, sign-out, purchase flows). If a save fails, keep the text on screen.
- One entry per prompt: reopening a prompt opens its existing entry, never a duplicate.
- Entries store a snapshot of the prompt text. Editing the catalog never rewrites saved entries.
- `created_at` never changes after creation; edits update `updated_at`.
- Schema changes go through numbered migrations. Never drop or rewrite user data in a migration
  without an explicit, tested plan.

### Copy and content
- All user-facing text lives in `src/strings/`. Dates and numbers use locale-aware formatting.
- Do not write final editorial prompt copy. Use clearly marked `PLACEHOLDER` text until the
  founder supplies approved prompts.
- No streaks, scores, feeds, likes, share prompts in the writing flow, AI advice, or anything that
  implies the app analyzed or understands what the user feels (PRD §11).
- Handwritten/decorative marks are static decoration, never presented as analysis of an entry.

### iOS-first guardrails
- iOS (iPhone) is the only launch target. Don't spend time on Android layouts or Android-only
  bugs until the Android phase, but don't write code that would block Android later.
- Put platform-specific code in `*.ios.tsx` / `*.android.tsx` files rather than scattered
  `Platform.OS` checks.
- Behave like a native iPhone app: native tab bar, bottom sheets, swipe-back, haptics, keyboard
  avoidance on the writing screen, safe areas.
- Accessibility is required, not polish: Dynamic Type (no clipped or overlapping text at the largest
  sizes), VoiceOver labels and order, reduced motion, 44pt minimum touch targets, and no state
  shown by color alone. Decorative images and handwriting are hidden from VoiceOver.

### Design
- Use tokens from `src/theme/` only; no raw hex values in components (ESLint enforces this).
- Text goes through `AppText` with a `variant` (type role) and a `color` token.
- Transit orange is 4.07:1, so it's for icons, rules, large text and accents only; small orange text on dark
  uses `accentOnDark`. Contrast is enforced by `src/theme/__tests__/contrast.test.ts`.
- Near black `#111113`, warm ivory `#F3F0E8`, transit orange `#C84D1B` (small accents only),
  graphite `#5C5A56`. No pink, saturated yellow, or lipstick motifs.
- The user's writing is always plain, readable serif text. No texture or motion behind it.

## Testing and definition of done

Every feature ships with tests. A step is done only when:
1. `npm run typecheck`, `npm run lint`, `npm run format:check` and `npm test` all pass, and
   `EXPO_OFFLINE=1 npx expo export --platform ios` bundles without errors.
2. Logic modules have unit tests; screens have at least one behavior test for the main path.
3. The relevant PRD acceptance criteria are listed, each marked as covered by an automated
   test or with manual steps for the founder to check on a phone or in the Simulator.
4. The commit message says which BUILD_PLAN step and PRD sections it covers.

Don't claim something works on a device unless it was run on one. Say "unit-tested only" when that's the case.

## Running the app

(Available from BUILD_PLAN Step 1 onward.)

```bash
npm install          # install dependencies
npx expo start       # start the dev server; scan the QR code with the iPhone camera to open in Expo Go
                     # (press "i" for the iOS Simulator if Xcode is installed; optional)
npm test             # run unit and component tests
npm run lint         # lint
npm run typecheck    # TypeScript check
npm run format       # Prettier (format:check to verify)
```

Step-by-step instructions for the founder are in `README.md`.

The founder tests on a real iPhone, without Xcode. Use Expo Go until a feature needs native code
Expo Go doesn't include (purchases via RevenueCat, from BUILD_PLAN Step 12). From then on, use an EAS
cloud development build. Keep the project on the SDK version the current App Store Expo Go supports.

## Git

- Work on the branch given for the session. Small, focused commits, one BUILD_PLAN step at a time.
- Never commit secrets, `.env` files, or real user data.
