# Decisions log

Decisions made after `docs/PRD.md` v1.0. Newest at the bottom. D2–D15 were proposed as P1–P14 and approved by the founder.

## Confirmed

| # | Decision | Date |
|---|---|---|
| D1 | Build with Expo (React Native + TypeScript). iPhone-only for about the first year, Android after. SwiftUI rejected because Android would then need a second app. | Sep 2026 |
| D2 | What does the **Write tab** show when no prompt is open? → The most recent unfinished entry. If there is none, the next unanswered prompt the user can access (starting with The Many Selves, prompt 1). | Sep 2026 |
| D3 | Can one entry have **both text and a voice recording**? How many recordings? → Yes, text and voice in the same entry. One recording per entry in V1; recording again replaces it after confirmation. | Sep 2026 |
| D4 | What counts as a **"complete"** answer? → Any entry with some text or a recording can be marked complete. An empty entry can't. | Sep 2026 |
| D5 | Can a user **answer the same prompt again** later as a new entry? → Not in V1. One entry per prompt, which they can keep editing. Revisit after beta. | Sep 2026 |
| D6 | Do **drafts appear in the Archive**? → Yes, marked "Draft", so nothing feels lost. | Sep 2026 |
| D7 | **Sequential unlock** inside a collection → As in the PRD: the next prompt unlocks when the current one is marked complete. Behind a setting so it can be switched off in beta without an app update. | Sep 2026 |
| D8 | **Face ID / passcode lock** for the app → Include an optional lock (off by default) in V1. App-switcher blur on by default. | Sep 2026 |
| D9 | **iOS device backups** for guest users → Allow standard iPhone/iCloud device backups (restoring a phone restores entries). Say so plainly in the privacy screen. | Sep 2026 |
| D10 | **Light/dark mode** → Fixed art-directed look in V1: dark Home/Archive, ivory Write, regardless of system setting. | Sep 2026 |
| D11 | **Minimum iOS version and iPad** → iOS 16 and newer. iPhone only; no iPad layout in V1. | Sep 2026 |
| D12 | **Timer haptic setting** → Follows the iPhone's system haptics setting, plus an on/off toggle in Settings. | Sep 2026 |
| D13 | **Where a transcript lives** → Stored with the recording, shown under it as editable text, and included in search and export. Not merged into the typed text unless the user taps "Add to entry". | Sep 2026 |
| D14 | **Analytics and crash reporting** → Crash and error reporting only for the beta (Sentry, with content scrubbing). Add privacy-focused event counts after beta if needed. | Sep 2026 |
| D15 | **Archive entry numbers** ("No. 014") → Numbered in order of creation, per device/account. Numbers are not reused after a delete. | Sep 2026 |
