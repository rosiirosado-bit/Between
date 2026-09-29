# Between Product Requirements Document

**Version:** 1.0  
**Date:** September 2026  
**Status:** Proposed specification for design and development  
**Product owner:** Founder  
**Initial platform:** iPhone app; responsive web and Android follow after validation

## 1. Product overview

Between is a private, editorial journal prompt app for people who want to reflect in the small spaces of a busy life: a subway ride, a pause between meetings, or the trip home. It offers curated questions about identity, desire, inheritance, and change. Users can write or speak an answer, leave and return without losing it, and revisit their entries in a searchable archive.

The promise is **“For the versions of yourself you don’t post.”** The product asks good questions and leaves room for the user’s own meaning. It should feel like a well edited magazine and a personal notebook carried through the city. It does not diagnose, coach, rank feelings, or impose a daily streak.

This PRD defines an achievable first release, its design direction, acceptance criteria, and later features. It supersedes the earlier charcoal, cream, brick red palette. The selected visual reference is the **black and ivory subway mockup**: dark subway photography, ivory writing space, orange seat accents, handwritten notes and restrained typewriter details. The app name remains **Between**; “Between Stops” is an editorial motif, not a proposed rename.

## 2. Audience and problem

**Primary audience:** Adults roughly 25–45 with creative, culturally curious, urban sensibilities. The original audience is women who do not identify with conventional wellness products, but the interface and marketing should welcome anyone who connects with the voice. They may be writers, designers, artists, or knowledge workers. They often have a few minutes available, not a protected 20 minute ritual.

**Job to be done:** “When I’m in transit or between obligations, I want one question that helps me notice what I’m feeling and save my thoughts privately, even if I only have three minutes.”

**Product principles**

1. **A question, then space.** The prompt is the editorial intervention; the app does not prescribe an answer.
2. **Stop and start naturally.** Every entry can be a short note or a long session. An interruption never erases work.
3. **Privacy is visible.** Entries and recordings are private by default; the product says plainly when audio is uploaded for transcription or when data syncs.
4. **Personal, not performative.** Handwriting and archive annotations feel like personal marginalia. There are no feeds, public profiles, likes, streaks, or share prompts in the writing flow.
5. **Editorial restraint.** Photography and expressive typography carry mood; controls and entry text remain readable and predictable.

## 3. Goals and measures

**Launch goals**

- A new user can open a free collection and begin answering a prompt without an account.
- A user can create, save, reopen, edit, search, export, and delete a private text entry.
- A user can record a voice response, play it back, and optionally receive an editable transcript when transcription is available.
- A paid user can access all launch collections and restore access on a new device.
- The app remains usable during a subway connectivity gap for previously loaded prompts and local entries.

**Measures to review after launch** (targets to set after a small pilot): first prompt started, first entry saved, percentage returning to an entry within 7 days, collection completion, free to paid conversion, voice feature usage, crashes, draft recovery failures, transcription errors, export success, and account deletion completion. Do not collect journal text or audio for analytics.

## 4. Release scope and decisions

| Area | Version 1 requirement | Later release |
|---|---|---|
| Platform | Native iOS experience, phone layouts | Responsive web, Android |
| Collections | Four launch collections, 34 prompts total | New editorial collections released periodically |
| Free access | One complete free collection, **The Many Selves** | Test alternate previews after launch |
| Entry | Plain text, local draft, optional timer, save and edit | Rich media or attachments only if justified |
| Voice | Record and retain audio; request editable transcription | On device transcription where practical, advanced editing |
| Archive | Timeline, entry detail, keyword search, export | User controlled theme review or pattern highlights |
| Account | Guest access; sign in required for sync and subscription recovery | Additional identity providers |
| Paid access | Monthly and annual subscription entitlements | Pricing experiments |
| Notifications | Off by default; optional gentle writing reminder | Personalized scheduling |

**Pricing assumption:** $18/month or $180/year, subject to product owner confirmation before store configuration. Prices displayed in the app must come from the active store products. A free user may browse every collection’s title and description, but can answer all seven prompts only in The Many Selves. This resolves the earlier brief’s conflict between “three free cards” and “one free collection.”

**Prompt progression:** Follow the original brief’s sequential collection order. The next prompt unlocks when the user deliberately marks the current one complete; there is no word count or time threshold. A partial answer remains saved and resumable. Users can revisit and edit completed entries. Test this progression in beta because mandatory order may frustrate short commute sessions.

## 5. Content model

The launch catalog is curated and shipped with the app or cached after first load. Store collection content separately from user data so editorial changes do not alter saved prompts or responses.

| Collection | Prompts | Access | Editorial theme |
|---|---:|---|---|
| The Many Selves | 7 | Free | Identity, performance, hidden selves |
| What We Carry | 10 | Paid | Inheritance, patterns, release |
| Permission to Want | 10 | Paid | Desire, ambition, shame |
| The Space Between | 7 | Paid | Transition and uncertainty |

Each collection has a stable ID, title, short description, cover asset, prompt count, estimated time range, access tier, editorial order, and published state. Each prompt has a stable ID, collection ID, order, text, optional short editorial label, and version. The entry saves a snapshot of the exact prompt text shown when it was written, so a later copy edit does not rewrite the user’s archive.

**Editorial requirements:** Prompts must stand alone for a three to five minute answer, while allowing longer writing. Estimated time is a range such as “3 minutes or as long as you need,” not “20 min each.” Review content for emotional care and avoid implying therapy or a guaranteed outcome. The full set of 34 prompts needs a separate, approved editorial content file before launch; the collection descriptions in the earlier brief are direction, not a complete prompt inventory.

## 6. Information architecture and user journeys

**Primary navigation:** Home, Write, Archive. Settings is available from a small top level control. The active tab is clearly labeled; navigation persists around primary screens but can be minimized during focused writing.

**First use:** Launch → brief value statement → Home and collection browse → open The Many Selves → choose prompt → type or record → local draft saves → invite to create account when the user asks to sync, subscribe, or use the journal on another device. An account is not required merely to try a prompt.

**Returning user:** Open app → resume the most recent unfinished entry from Home → continue offline if necessary → save and close or mark done → optionally start another prompt.

**Archive:** Open Archive → reverse chronological list with date, collection, prompt label and limited user text preview → search by keyword → open entry → edit, play audio, export or delete through explicit actions.

**Paid conversion:** Tap a paid collection → see its editorial description and locked prompt list → open paywall → select a store plan → complete purchase → content unlocks on confirmed entitlement. Dismissal returns to the same collection without losing context.

## 7. Functional requirements and acceptance criteria

### 7.1 Home and collection browsing

- Show brand, editorial lead image or composition, a prominent “Continue writing” action if a draft exists, and all four collection cards.
- Cards show title, one line of description, prompt count, and free or paid status. Locked content remains browseable.
- Collection detail shows all prompt titles or first lines, editorial order, progress, and clear actions to start or resume.
- Preserve the user’s last position after leaving the app or navigating back.

**Acceptance:** A first time user can reach a free writing screen within three taps after opening the app. A paid collection opens the paywall only when the user tries to start a locked prompt.

### 7.2 Writing and drafts

- Show one prompt with a full height, plain text editor. The keyboard does not hide the active line or save controls.
- Save locally after a short idle interval and on app backgrounding, navigation, and explicit Save & close. Show a quiet Saved state only after data is committed.
- Keep drafts separate from completed responses. Returning to a prompt opens its existing draft or entry; do not silently create duplicates.
- Support unlimited practical text length within device storage; if storage fails, show an error and keep the editable text on screen.
- A user can leave an empty prompt without a confirmation. For unsaved text after a failed save, offer Retry or Keep writing. Deletion and explicit discard require confirmation.
- Timed writing is optional. The Timer control on the writing screen opens a compact “Set a writing session” sheet. The user can choose **any whole number of minutes from 1 through 30, inclusive, in one minute increments**. Offer an editable minute value with minus and plus buttons and a slider that snaps to whole minutes; the controls remain synchronized and cannot go below 1 or above 30. Include an Off / Untimed choice. Untimed writing is the default; the app may remember the last selected duration locally without starting a timer automatically. The primary action reads, for example, “Start 17-minute session.”
- When active, show a thin progress track across the top of the ivory writing screen, beneath the system status area and above the prompt. A transit orange fill grows **left to right** in proportion to elapsed time. Pair it with a small typewriter label such as “20 MIN SESSION” and a pause/resume control. Do not display a large countdown clock.
- Pause and resume preserve elapsed time. Backgrounding the app pauses the session automatically, so a commute interruption does not exhaust it. Reopening shows the paused progress and a clear Resume action. The user may change duration or turn the timer off without deleting the entry; a new duration starts a new session and asks for confirmation if a current timed session is active.
- At full progress, change the label to “Session complete,” provide one gentle haptic pulse when enabled, and allow the user to keep writing or save and close. Do not sound an alarm, close the editor, submit an entry, or block continued writing. Timer progress is session state, separate from draft saving and prompt completion.

**Acceptance:** Type text, background the app, lose network access, reopen, and find the draft intact. Editing an archived entry updates that entry and its modified timestamp without changing its original created date. Set 1, 17 and 30 minute sessions using the slider, step buttons and editable value; each produces the correct session length and label. Attempting to decrement 1 or increment 30 does nothing. Start a 17 minute session, pause at about halfway, background and reopen: the bar remains at the paused position until Resume. At full progress, writing and saving still work.

### 7.3 Voice response and transcription

- Ask for microphone permission only when recording begins. Provide start, pause/resume if supported, stop, playback, delete, and retry states.
- Store audio locally first and associate it with the same entry. Set a clear recording duration or file size limit in the UI before it is reached; the original proposal suggested 50 MB, which requires device testing.
- Transcription is optional. If a remote transcription service is used, ask for informed consent before upload; explain what is sent and whether it is retained by the provider. A transcript appears as editable text and is marked as a draft until the user saves it.
- Recording must still be savable and playable if transcription fails or the device is offline. Retry transcription later without duplicating audio.

**Acceptance:** Denying microphone access leaves text entry functional. Airplane mode permits a locally saved recording; transcription displays Pending or Unavailable and can be retried when connected.

### 7.4 Archive and search

- List newest entries first; show created date, collection, prompt identifier and a short preview. Never show preview text in notifications or the device app switcher if privacy shielding is enabled.
- Search local entry text and prompt snapshots by keyword. Return matched entries with a clear empty state. Audio-only entries are searchable by prompt and metadata until transcribed.
- Entry detail shows prompt snapshot, response, dates, and audio playback if present. Allow edit and delete.
- Provide export of all entries in a portable text or JSON format and a human readable format; include audio files in the full export when possible. Make export available in Settings with an explicit share or save action.

**Acceptance:** Search finds a saved word with the device offline. Export includes every locally retained entry, a clear indication of pending sync, and its associated prompt. Deleting one entry removes its local text and audio and queues the deletion for any synced copy.

### 7.5 Account, synchronization and deletion

- Guest use is local to the current installation. Explain this before a user relies on cross device recovery.
- Account sign in enables encrypted transport to a user scoped store and sync across devices. Never expose entries between accounts. Handle offline edits, retries, duplicates and conflicts deterministically; a conflict must retain both versions until resolved.
- Sign out must explain whether local entries remain on this device. Provide an option to remove local copies on shared devices.
- Settings includes export, delete account and data, privacy explanation, subscription management, help, and optional reminders.

**Acceptance:** An authenticated user can reinstall and restore synced text entries. A guest can export before deleting the app. An account deletion request removes server content, revokes access and reports completion or pending status; any required retention exceptions are explained plainly.

### 7.6 Subscription

- The paid tier unlocks all four launch collections and later additions while entitlement is active. Free entries remain accessible after cancellation or expiration.
- Present monthly and yearly plans, prices, billing periods, and restore purchases. Reflect the store’s actual localized price and subscription terms.
- Purchase cancellation, declined payment, pending purchase, restored purchase, renewal and expiry have clear states. A failed purchase never removes an existing entry.
- Entitlement should be cached so existing subscribers can use already downloaded paid prompts offline for a reasonable grace period; reconcile when connectivity returns.

**Acceptance:** A returning subscriber can restore access after reinstalling. A lapsed subscriber can read and export prior paid collection entries and cannot begin newly locked prompts.

### 7.7 Notifications and support

- Reminders are opt in, configurable and off by default. Copy never reveals journal content or suggests the app knows what the user feels.
- Provide concise support, privacy, and accessibility routes from Settings.

## 8. Visual and interaction specification

**Art direction:** Use the specific three screen mockup supplied by the founder as the reference: near black subway car and windows on Home, warm orange seats, a cropped fashion still life without a face, an ivory writing screen, and a near black Archive with small photo fragments. Light falls on metal and textured fabrics. Images should feel observed and composed. License original or properly cleared photography; do not build the production app from a social media screenshot.

**Typography:** Match the mockup’s thin lowercase “between” wordmark and large expressive italic serif for Home statements, prompts and Archive heading. Use a highly readable roman serif for entry text and a clean, spaced sans for navigation and collection metadata. Reserve a restrained monospaced typewriter face with subtly uneven ink for ticket labels, “FIELD NOTE,” entry numbers and dates. The user's writing remains readable plain text, without simulated typewriter distortion. Licensed font choices and fallbacks must be documented in design handoff.

**Handwritten layer:** Preserve the supplied mockup’s handwritten “same city, new nerve” on the Home photograph, the rust ink margin thought and arrow beside the writing area, and the torn “More of me” note and “finally” mark in Archive. Add a small typewritten “BETWEEN STOPS / ISSUE 01” transit stub on Home, “FIELD NOTE 01 / BETWEEN STOPS” above the prompt, and understated entry numbers and dates in Archive. These are sample editorial copy and visual treatments; archive marginalia must be tied to actual user content or clearly presented as static editorial decoration, never fabricated as if the app analyzed a private response. Handwriting must not overlap input, obscure controls, or carry functional information by itself. In production, cap each screen at one or two handwritten details and keep the labels compact. Create these as scalable assets or accessible text treatments, not embedded into screenshots of UI.

**Color tokens for initial design exploration:** near black `#111113`, warm ivory `#F3F0E8`, transit orange `#C84D1B`, graphite `#5C5A56`. These are proposed tokens sampled conceptually from the selected mockup; refine against actual art and contrast checks. Orange marks small actions or editorial moments. Avoid pink, saturated yellow and lipstick motifs.

**Layout:** Full bleed photography is reserved for Home and collection covers. Writing uses a quiet ivory surface with generous margins, a persistent prompt, clear save state, and no moving texture behind text. The optional timer’s orange fill sits in a slim top rail with its session label and pause button. The Timer control near the microphone and Save & close actions opens a bottom sheet showing the selected minute value, minus and plus buttons, a 1–30 slider, Off / Untimed and a Start action. If the timer is off, the top rail is absent and the prompt moves up. Archive can mix small photographic thumbnails with clean rows and thin rules. Hand drawn marks should feel deliberately placed, not random stickers.

**Accessibility:** Text and controls meet applicable contrast standards; all controls have clear labels and generous touch areas. Dynamic Type, screen reader order, reduced motion, keyboard focus, voice controls, and color independent state cues must be supported. The timer’s progress has a screen reader value such as “12 of 20 minutes elapsed”; paused and complete states also have text labels. The bar’s fill is never the only indication of progress. Decorative handwriting and images are hidden from assistive technology unless they carry content; meaningful copy has accessible text. A screen must remain usable at larger text sizes without overlap.

**Reference status:** The generated three phone “Between Stops” mockup is an art direction reference, not a pixel perfect specification. Its date labels, sample entries, copy and imagery are illustrative and must not be treated as live user data.

## 9. Data and privacy requirements

**Core objects:** User/account, collection, prompt, entry, audio asset, transcript state, subscription entitlement, reminder preference and sync operation. Entry fields include stable ID, owner ID if signed in, collection and prompt IDs, prompt text snapshot, body, status, created/updated timestamps, audio reference, transcript status, and deletion state.

- Journal content is private by default. No third party advertising SDK has access to entries or audio.
- Store local data using platform protected storage and encrypt synced content in transit and at rest. Keep tokens and service credentials out of the client bundle.
- Limit analytics to events and counts; never log prompt responses, transcripts, recording bytes, search strings, or export contents.
- Publish a privacy policy before release that describes cloud sync, audio transcription, data retention, deletion, and processors. Obtain consent at the moment a recording leaves the device.
- Use explicit user action for export and sharing. Lock screen notification previews must not contain journal content.
- Pattern recognition, if later added, should be off by default, transparent about processing, removable, and described as observations rather than psychological conclusions. No mental health inference should be sold as a fact.

## 10. Nonfunctional requirements

- **Reliability:** Local saves work without connectivity and survive force quit or interruption. Sync is retried safely and idempotently.
- **Performance:** Previously loaded Home, prompt and Archive screens should appear promptly on a current supported iPhone; large archives should scroll and search without freezing the editor. Set measurable budgets during implementation profiling.
- **Security:** Authenticate server requests, authorize every data access by owner, protect uploaded audio, test access control and account deletion flows.
- **Observability:** Capture crashes, save and sync errors and purchase state failures without collecting journal content.
- **Localization readiness:** Externalize all copy, formats and dates. English is the launch language; Spanish can follow with editorial review rather than automatic prompt translation.
- **Content operations:** Prompt catalog is versioned. A published prompt used by an existing entry remains available through its saved snapshot.

## 11. Explicit exclusions from version 1

No public community, social sharing feed, AI advice, sentiment score, diagnosis, streak, mandatory daily notification, chat therapist, or auto generated “insights.” Responsive web and Android are follow on projects, not hidden dependencies of iOS launch. Background transcription and advanced pattern highlights require separate privacy and quality review.

## 12. QA and launch criteria

The first release is ready for a small private beta when a tester can:

1. Browse without sign in, open The Many Selves and save an entry in under five minutes.
2. Close and reopen the app mid sentence with the exact draft intact, including in airplane mode.
3. Record, stop, replay and save audio; understand when transcription is pending or requires network access.
4. Find a prior entry by keyword, edit it, and export a readable copy.
5. Buy or restore a subscription in a test environment; open paid prompts; keep prior entries readable after expiry.
6. Create an account, sync across two devices, and resolve a simulated conflicting edit without losing either version.
7. Delete an entry and an account with the corresponding data removed or explicitly pending removal.
8. Complete the critical flows with screen reader, large text and reduced motion settings.
9. Select any duration from 1 to 30 whole minutes, including the endpoints, then start, pause, resume, background, complete and turn off a timed session without losing text or triggering automatic submission.

Before public release, approve the final 34 prompt texts, photography and font rights, privacy policy, store metadata, support route, pricing, screenshots and purchase terms. Run a beta across real commutes and intermittent connectivity. The founder should approve the final visual system in the working app, since generated imagery can imply spacing and effects that do not translate directly to production UI.

## 13. Delivery plan and handoff

**Indicative schedule from a confirmed scope and ready content, with one developer using AI assistance and a founder reviewing decisions:**

| Phase | Duration | Deliverable |
|---|---:|---|
| Product and editorial lock | 1 week | Approved 34 prompts, core flows, visual tokens, purchase rules |
| Interactive prototype | 1–2 weeks | Clickable Home, Write, Archive, paywall; usability feedback |
| iOS build | 4–8 weeks | Local journal, voice, accounts, sync, store purchases |
| Beta and release preparation | 2–3 weeks | Accessibility, device testing, privacy review, store assets and fixes |

An **iOS beta is plausibly 6–11 weeks** after scope and content are ready; a public launch commonly needs additional time for review and fixes. This is a planning range, not a delivery guarantee. A text first beta without voice transcription, cloud sync or subscriptions can be shown much sooner, but it should be labeled a prototype and not marketed as the full app.

**Build handoff:** Provide this PRD, the selected subway mockup, source or licensed photo assets, font licenses, a machine readable prompt catalog with 34 approved texts, design tokens, screen states, and the store product identifiers to the coding agent. Ask it to implement one vertical flow first—Home → free prompt → local autosave → Archive—then add accounts, voice, subscription and sync. Require it to demonstrate each acceptance criterion on a device or simulator before moving on.

## 14. Decisions to confirm before implementation

1. Final exact prompt copy for all 34 launch prompts and the collection descriptions.
2. Whether a guest's local entries should be merged into an account automatically at sign up, with duplicate handling.
3. Recording limit and transcription provider, including retention and cost assumptions.
4. Final photo and font selections with commercial rights.
5. Subscription price, any introductory offer, and territories at launch.
6. The exact words and placement of the handwritten editorial notes in the shipping interface.

These items do not block prototyping the free text flow and selected visual direction. They do block a complete paid public release.
