# Between — Build Plan & Prompts

A step-by-step path from an empty repo to an iOS private beta, based on `docs/PRD.md`.
Each step has a copy-paste prompt. Run one step per session (or per request), test it,
then move on. This follows the PRD §13 handoff: **build one vertical flow first
(Home → free prompt → local autosave → Archive), then add voice, subscription, accounts and sync.**

---

## Before you start: what only you can provide

| Item | PRD ref | Blocks |
|---|---|---|
| The three-screen subway mockup image (put in `design/reference/`) | §8 | Visual polish (Step 9) — not the early steps |
| Final text for the 34 prompts + collection descriptions | §5, §14.1 | Public release only. We'll use clearly marked placeholders until then |
| Font choices (or "use free Google Fonts for now") | §8 | Nothing early — we start with free fallbacks |
| Licensed photography | §8 | Visual polish; placeholders until then |
| Apple Developer account ($99/yr) | — | Installing on your phone via TestFlight, purchases (Step 12+) |
| Prices, intro offer, territories | §4, §14.5 | Subscriptions (Step 12) |
| Transcription provider + recording limit | §7.3, §14.3 | Transcription (Step 11) |
| Guest → account merge rule | §14.2 | Sync (Step 13) |

---

## Recommended tech stack

**Expo (React Native + TypeScript)**, because:

- You can build and test from these cloud sessions and try the app on your own iPhone
  (Expo Go / development builds) **without owning a Mac**. App Store builds run in the
  cloud with EAS Build.
- Android and web — the PRD's "later release" platforms — come from the same code.
- Everything the PRD needs exists: `expo-sqlite` (local, offline, full-text search),
  `expo-audio` (recording), `expo-haptics`, `expo-notifications`, `expo-secure-store`,
  RevenueCat (App Store subscriptions), Supabase (accounts + sync with per-user access rules).

**Decision (confirmed by founder):** Expo. The app is iPhone-only for roughly the first year, with
Android planned after. Native SwiftUI was considered and rejected: Android would then mean building
and maintaining a second app. With Expo, Android later is mostly testing and polish.

**Guardrails so it still feels like a native iOS app (PRD §4):**
- Build and polish for iOS first. Don't spend time on Android layouts until the Android phase.
- Use native iOS behaviors: native tab bar, bottom sheets, haptics, swipe-back, Dynamic Type,
  VoiceOver, and keyboard avoidance on the writing screen.
- Keep platform-specific code in `*.ios.tsx` / `*.android.tsx` files so Android can be added later
  without touching iOS code.

**Using your Mac:** install Xcode so you can run the app in the iOS Simulator and make local builds.
The cloud sessions write and unit-test the code; you pull the branch on your Mac to try it.

---

## The steps

### Step 0 — Lock the stack and project rules
```
Read docs/PRD.md and docs/BUILD_PLAN.md. We're building Between with Expo
(React Native + TypeScript). Before writing code:
1. Summarize the V1 scope back to me in 10 bullets.
2. List anything in the PRD that's ambiguous or that you need me to decide now
   (beyond PRD §14), with your recommended answer for each.
3. Create a CLAUDE.md with the project's rules: the stack, folder structure,
   "never log or send journal text/audio to analytics", "all copy externalized
   for localization", "every feature ships with tests", and how to run the app/tests.
Commit and push.
```

### Step 1 — Project skeleton, design tokens, navigation
```
Set up the Expo project (TypeScript, Expo Router, ESLint, Prettier, Jest +
React Native Testing Library). Add:
- Design tokens from PRD §8: near black #111113, ivory #F3F0E8, transit orange
  #C84D1B, graphite #5C5A56, plus type roles (italic display serif, roman reading
  serif, spaced sans, monospace "typewriter"). Use free Google Fonts as placeholders
  and document them in docs/DESIGN.md.
- Tab navigation: Home, Write, Archive, with Settings from a small top control.
- All user-facing strings in a single strings file (PRD §10 localization).
Keep screens as simple placeholders. iOS is the only launch target, but don't
write anything that would block Android later. Give me step-by-step instructions
(I'm not a developer) to pull this branch on my Mac and open the app in the iOS
Simulator and on my iPhone.
Commit and push.
```

### Step 2 — Content catalog (collections and prompts)
```
Implement the content model from PRD §5. Create content/catalog.json with the
four collections (The Many Selves 7 free, What We Carry 10 paid, Permission to
Want 10 paid, The Space Between 7 paid) with stable IDs, description, prompt
count, time estimate ("3 minutes or as long as you need"), access tier, order,
published state, and prompts with stable ID, order, text, label, version.
Use obviously marked PLACEHOLDER prompt text — do not invent final editorial copy.
Add a typed loader and tests that validate the catalog (34 prompts, unique IDs,
correct counts). Commit and push.
```

### Step 3 — Local database for entries
```
Implement local storage with expo-sqlite following PRD §9: an entries table with
id, owner_id (nullable), collection_id, prompt_id, prompt_text_snapshot, body,
status (draft | complete), created_at, updated_at, audio_ref, transcript_status,
deleted_at. Add an FTS index for keyword search over body and prompt snapshot.
Write a small repository module (create/get-by-prompt/update/list/search/delete)
with tests. Rule: one entry per prompt — returning to a prompt reopens its
existing draft, never creates a duplicate (PRD §7.2). Commit and push.
```

### Step 4 — The vertical slice: Home → prompt → autosave → Archive
```
Build the first end-to-end flow from PRD §6 "First use" and §7.1–7.2, text only:
- Home: wordmark, "Continue writing" if a draft exists, four collection cards
  (title, one-line description, prompt count, free/paid).
- Collection detail: prompts in order with progress; start/resume actions.
- Write screen: prompt at top, full-height plain text editor, keyboard never hides
  the active line or Save & close.
- Autosave after a short idle pause, on app backgrounding, on navigation, and on
  Save & close. Show a quiet "Saved" only after the write succeeds.
- Archive: newest first, date, collection, prompt label, short preview.
A first-time user must reach the free writing screen in 3 taps or fewer.
Write tests for autosave and no-duplicate behavior, then tell me exactly how to
test "type, background the app, go into airplane mode, reopen — draft intact".
Commit and push.
```
*After this step, try it on your phone. This is the heart of the app.*

### Step 5 — Writing rules: progression, completion, error handling
```
Finish PRD §7.2 and §4 "Prompt progression":
- "Mark complete" action; the next prompt in a collection unlocks only when the
  current one is marked complete. Completed entries stay editable.
- Editing an archived entry updates updated_at but never created_at.
- Leaving an empty prompt needs no confirmation. If a save fails, keep the text on
  screen and offer Retry or Keep writing. Delete/discard require confirmation.
- Home "Continue writing" resumes the most recent unfinished entry; restore the
  user's last position after leaving the app.
Put the progression rule behind a single config flag so we can test it in beta.
Add tests. Commit and push.
```

### Step 6 — Writing timer
```
Implement the optional timer exactly as PRD §7.2 and §8 describe:
- Timer control opens a bottom sheet: minute value (editable), minus/plus buttons,
  slider snapping to whole minutes, all synced, clamped 1–30; Off / Untimed option;
  primary button "Start 17-minute session". Untimed is default; remember last
  duration locally but never auto-start.
- Active session: thin top rail with orange fill growing left to right, a
  typewriter label like "20 MIN SESSION", pause/resume. No big countdown.
- Backgrounding auto-pauses. Changing duration during a session asks to confirm.
- At the end: "Session complete", one gentle haptic, keep writing allowed.
  Never auto-save-and-close or submit.
- Screen reader value like "12 of 20 minutes elapsed".
Put the timer math in a pure, unit-tested module covering 1, 17, 30 minutes,
clamping at 1 and 30, pause/resume, and background. Commit and push.
```

### Step 7 — Archive: search, detail, edit, delete
```
Complete PRD §7.4 (except export): keyword search over entry text and prompt
snapshots that works offline, with a clear empty state; entry detail showing
prompt snapshot, response, created/updated dates; edit and delete (with
confirmation). Make sure large archives scroll smoothly — generate 1,000 fake
entries in a dev-only seed script to test it. Commit and push.
```

### Step 8 — Export and Settings shell
```
Build Settings (PRD §7.5, §7.7) with sections for: Export, Privacy explanation,
Subscription (placeholder), Reminders (placeholder), Help/Support, Accessibility,
Delete my data. Implement export of all entries as JSON plus a human-readable
Markdown file, shared via the system share sheet; include each entry's prompt
snapshot and dates. Explain on screen that guest data lives only on this device.
Commit and push.
```

### Step 9 — Visual pass: the subway art direction
*(Needs the mockup in `design/reference/`.)*
```
Look at design/reference/ and PRD §8. Restyle Home, Write and Archive to match
the art direction: near-black Home with full-bleed photo (use placeholders in
assets/photos/ until licensed images arrive), ivory writing surface, orange for
small accents only, thin lowercase "between" wordmark, italic serif prompts,
typewriter labels ("BETWEEN STOPS / ISSUE 01", "FIELD NOTE 01 / BETWEEN STOPS").
Add at most 1–2 handwritten details per screen as scalable assets that never
overlap input or controls and are hidden from screen readers. Archive marginalia
must be static decoration — never implying the app analyzed an entry.
Check contrast of every text/background pair and report the results. Commit and push.
```

### Step 10 — Voice recording (local only)
```
Implement PRD §7.3 recording without transcription: ask for microphone
permission only when the user taps record; states for start, pause/resume,
stop, playback, delete and retry. Save audio locally and link it to the same
entry. Show a clear duration limit before it's reached (propose a limit and
explain the file size). If mic permission is denied, text entry keeps working.
Recording must work in airplane mode. Commit and push.
```

### Step 11 — Transcription (with consent)
*(Needs your provider decision.)*
```
Add optional transcription using [PROVIDER]. The API key must live on a server
function, never in the app. Before the first upload, show a consent screen
explaining what's sent, and whether the provider retains it. Transcript appears
as editable draft text until saved. Offline or failed → show Pending/Unavailable
with Retry, never duplicating the audio. Audio-only entries are searchable by
prompt/metadata until transcribed. Commit and push.
```

### Step 12 — Subscription and paywall
*(Needs Apple Developer account, product IDs and prices.)*
```
Implement PRD §7.6 and §6 "Paid conversion" with RevenueCat + App Store:
- Paid collections are browseable; the paywall appears only when starting a
  locked prompt. Dismissing returns to the same collection.
- Monthly and annual plans with prices read from the store (never hard-coded),
  Restore Purchases, and clear states for cancelled, declined, pending,
  restored, renewed and expired.
- Cache entitlement for offline use with a grace period; reconcile online.
- Lapsed subscribers can still read/export past paid entries but can't start
  new locked prompts.
Walk me through every App Store Connect / RevenueCat setup step I must do myself.
Commit and push.
```

### Step 13 — Accounts, sync, conflicts, deletion
*(Needs your guest-merge decision.)*
```
Implement PRD §7.5 with Supabase (Sign in with Apple + email):
- Guest mode stays local. Sign-in is offered only when the user wants sync,
  subscription recovery or another device.
- Row Level Security so users can only ever access their own rows — add tests
  that prove user A cannot read user B's entries or audio.
- Offline-first sync queue: idempotent retries, no duplicates; a conflicting edit
  keeps BOTH versions until the user picks one.
- Guest-to-account merge: [MY DECISION].
- Sign out explains what stays on the device and offers "remove local copies".
- Delete account removes server data and audio, revokes access, and reports
  done or pending.
Commit and push.
```

### Step 14 — Reminders, privacy shielding, observability
```
Add opt-in gentle reminders (off by default; copy never reveals journal content),
privacy shielding in the app switcher, and crash/error reporting that captures
save, sync and purchase failures WITHOUT any journal text, transcripts, search
terms or audio. Audit the whole codebase for anything that could log private
content and show me the results. Commit and push.
```

### Step 15 — Accessibility and launch QA
```
Run through the PRD §12 beta checklist item by item. For each: how you verified
it (automated test, or manual steps for me to do on my phone), and pass/fail.
Also check Dynamic Type at the largest sizes, VoiceOver order and labels,
reduced motion, and touch target sizes. Fix what fails. Write the results to
docs/QA_REPORT.md. Commit and push.
```

### Step 16 — TestFlight beta
```
Help me ship a TestFlight build with EAS: app icon, splash, bundle ID, privacy
nutrition labels, and store metadata drafts. List every step I must do in
App Store Connect myself.
```

---

## Handy prompts for any time

- **Something's broken:** `When I [do X], I expected [Y] but [Z] happened. Screenshot attached.`
- **Change the look:** `On the [screen], make [element] [change]. Keep everything else the same.`
- **Understand the code:** `Explain how autosave works in plain language, like I'm not a developer.`
- **Check quality:** `/code-review high` then `/security-review`
- **Plan without code:** start any request with `Don't code yet — propose an approach first.`

## Tips

- One step per request. If a step feels big, say "split this into two parts."
- Test on your phone after Steps 4, 6, 7, 9, 10 and 12. Those are the ones you'll feel.
- When you change your mind, update `docs/PRD.md` and tell me which section changed.
- A text-only prototype (Steps 0–9) is a good milestone to show people early — label
  it a prototype, as PRD §13 suggests.
