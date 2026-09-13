# Tickets — Hálanapló

Backlog for the gratitude journal PWA. Angular, no backend, no login, single personal user, mobile-first. Ordered roughly in build order; later tickets depend on earlier ones within the same epic unless noted.

Status legend: `[ ]` todo · `[x]` done

---

## Epic: Project Setup

### HN-1 — Scaffold the Angular project
**Status:** [x]
**Description:** Generate the base Angular app in this directory with routing and SCSS (or your preferred stylesheet format) enabled. Add the Angular PWA schematic (`@angular/pwa`) so the manifest, service worker config, and icons scaffolding exist from the start.
**Acceptance criteria:**
- `ng new` project created at the repo root (not nested in a subfolder).
- Routing module present.
- `@angular/pwa` added; `ngsw-config.json` and `manifest.webmanifest` exist.
- App builds and serves locally (`ng serve`).
**Notes:** Angular CLI 22.1.8 on Node 24.21.0 (LTS, installed via nvm-windows). `CLAUDE.md` updated with real build commands and architecture. Git repo initialized, no commits made yet.

### HN-2 — App shell & navigation
**Status:** [x]
**Description:** Build the top-level shell with navigation between the two main views: **Today** (daily entry) and **Calendar** (history). Mobile-first layout — bottom tab bar or similar thumb-reachable nav, not a desktop-style top nav.
**Acceptance criteria:**
- Two routes exist: `/today` (default) and `/calendar`.
- Nav control is reachable one-handed on a phone screen.
- Layout has no horizontal scroll at common mobile widths (360–430px).
**Depends on:** HN-1
**Notes:** `Today`/`Calendar` are stub components (real content lands in HN-6/HN-8). Bottom tab bar in `app.html`/`app.scss` with `env(safe-area-inset-bottom)` padding and 56px-tall tap targets. Verified routing, redirect, and active-tab highlighting in-browser via `ng serve`.

---

## Epic: Data Layer

### HN-3 — Entry data model
**Status:** [ ]
**Description:** Define the TypeScript model for a single day's journal entry: date (ISO `yyyy-MM-dd`, one entry per calendar day), exactly 3 gratitude items (strings), and a mood/status value for the day.
**Acceptance criteria:**
- `JournalEntry` interface defined with `date`, `items: [string, string, string]` (or equivalent fixed-length structure), and `mood`.
- Mood is a fixed 5-value enum, finalized from the `design/` mockup: `kimerult` (exhausted, icon `bedtime`), `borus` (gloomy, icon `rainy`), `bekes` (peaceful, icon `spa`), `vidam` (cheerful, icon `mood`), `halas` (grateful, icon `favorite`).

### HN-4 — Local persistence service
**Status:** [ ]
**Description:** Implement a storage service that reads/writes journal entries on-device, with no network calls. Use IndexedDB (via a light wrapper) rather than `localStorage` so the data can grow over years without size-limit surprises.
**Acceptance criteria:**
- `EntryStorageService` (or similar) exposes: get entry by date, save/update entry for a date, list all entries (or entries in a date range), delete entry.
- Data survives app reload and browser restart.
- No entry can be created for a future date.
**Depends on:** HN-3

---

## Epic: Daily Entry (Today view)

### HN-5 — Mood/status picker
**Status:** [ ]
**Description:** UI control on the Today view for picking today's overall mood/status — one tap, no typing. Simple icon or emoji-based selector matching the enum from HN-3.
**Acceptance criteria:**
- Exactly one mood selectable per day.
- Selecting a mood is a single tap and visually confirms the current selection.
- Selection persists via HN-4 immediately (or on entry save — decide alongside HN-6).
**Depends on:** HN-3, HN-4
**Notes:** Build against the 5-icon grid layout in `design/code.html`'s `#mood-selector` block (Material Symbols icons, active state = filled icon + primary-color ring), once HN-15/HN-16 land the design tokens and icon font.

### HN-6 — Three gratitude items input
**Status:** [ ]
**Description:** Core entry form: three separate short text inputs, one per gratitude item, for the current day. Loads today's existing entry if one exists (edit-in-place), otherwise starts blank.
**Acceptance criteria:**
- Exactly 3 inputs, clearly labeled/ordered (1, 2, 3).
- Reasonable max length per item to keep entries scannable in calendar/history views.
- Autosave on change (or explicit Save button — pick one and apply consistently across the app).
- Reopening the app the same day shows the already-entered items, editable.
**Depends on:** HN-3, HN-4
**Notes:** Keep the 3 inputs uniform (not the mockup's differentiated highlighted-quote/hashtag/plain-input treatment) — styled consistently via the HN-15 design tokens once those land.

### HN-7 — Empty/incomplete entry handling
**Status:** [ ]
**Description:** Decide and implement behavior when a user leaves the app with 0, 1, or 2 (not all 3) items filled in for the day. This is a personal single-user app, so favor forgiving behavior over blocking validation.
**Acceptance criteria:**
- Partial entries save without error.
- Today view clearly shows how many of the 3 items are filled in (e.g. "2/3 today").
- No entry is silently lost on navigation away from Today.
**Depends on:** HN-6

---

## Epic: Calendar & History

### HN-8 — Calendar month view
**Status:** [ ]
**Description:** Month-grid calendar showing which past days have a journal entry (and roughly how complete it is, and/or the day's mood as a small indicator/color on the cell).
**Acceptance criteria:**
- Standard month grid, navigable to previous/next months.
- Days with an entry are visually distinct from days without one.
- Mood (from HN-5) is visible at a glance per day (icon/color), if an entry exists.
- No future dates are selectable/enterable.
**Depends on:** HN-4, HN-5

### HN-9 — Day detail / memory view
**Status:** [ ]
**Description:** Tapping a day in the calendar opens a read view of that day's 3 gratitude items and mood — the "look back at memories" feature.
**Acceptance criteria:**
- Tapping any day with an entry shows its full content (read-only, or editable — decide whether past entries are editable and apply consistently).
- Tapping a day with no entry shows an empty state, not an error.
- Easy way back to the calendar (back button/gesture).
**Depends on:** HN-8

---

## Epic: PWA & Mobile

### HN-10 — Installability & offline support
**Status:** [ ]
**Description:** Make the app installable to a phone home screen and fully usable offline (it has no backend, so this should be close to automatic, but needs verification).
**Acceptance criteria:**
- App manifest has correct name, short_name, theme colors, and icon set (multiple sizes).
- App is installable (passes basic PWA installability checks in Chrome/Android).
- App works with network disabled after first load (service worker caching verified).
**Depends on:** HN-1

### HN-11 — App icon & branding
**Status:** [ ]
**Description:** Replace the default Angular PWA icons/splash with real Hálanapló branding (icon, theme color, app name as shown on home screen).
**Acceptance criteria:**
- Custom icon set covering the sizes required by `manifest.webmanifest`.
- Home screen name/short name reads correctly (not truncated) on a phone.
**Depends on:** HN-10

### HN-12 — Mobile visual polish
**Status:** [ ]
**Description:** Pass over spacing, typography, tap target sizes, and safe-area insets (notch/home-indicator) so the app feels native on a phone rather than a scaled-down desktop page.
**Acceptance criteria:**
- All interactive elements meet a ~44px minimum touch target.
- Layout respects `env(safe-area-inset-*)` on iOS-style notch devices.
- Verified at at least two common mobile viewport widths.
**Depends on:** HN-2, HN-6, HN-8

---

## Epic: Data Safety (no backend = no cloud backup)

### HN-13 — Export entries to file
**Status:** [ ]
**Description:** Since there's no backend and no login, all data lives only on this device. Add a way to export all entries to a local file (e.g. JSON) so the user can back it up manually.
**Acceptance criteria:**
- One-tap export produces a downloadable file containing all stored entries.
- Export format is human-readable enough to sanity-check (JSON).
**Depends on:** HN-4

### HN-14 — Import entries from file
**Status:** [ ]
**Description:** Companion to HN-13 — restore/merge entries from a previously exported file, for moving to a new device or recovering after data loss.
**Acceptance criteria:**
- Import accepts a file in the HN-13 export format.
- Conflicts (same date exists both locally and in import) are handled predictably (e.g. skip, overwrite, or ask — pick one).
**Depends on:** HN-13

---

## Epic: Design System

Sourced from the `design/` mockup (`DESIGN.md`, `code.html`, `screen.png`) — a Hungarian-language "Warm Mindful Sanctuary" visual design (terracotta/sage/amber palette, Literata + Plus Jakarta Sans typography). See the app name itself ("Hálanapló") — UI copy throughout the app is Hungarian.

### HN-15 — Design system foundation
**Status:** [ ]
**Description:** Translate `design/DESIGN.md`'s color, typography, and spacing tables into CSS custom properties, and load the mockup's fonts.
**Acceptance criteria:**
- SCSS tokens partial (e.g. `src/styles/_tokens.scss`) defines the full color set, type scale, spacing scale, and radii from `DESIGN.md`, named 1:1 with it.
- `src/index.html` loads Literata, Plus Jakarta Sans, and Material Symbols Outlined (Google Fonts), matching `design/code.html`'s `<head>`.
- `src/styles.scss` imports the tokens and applies the base font/background/text color globally.
**Depends on:** HN-1

### HN-16 — Restyle app shell to the design system
**Status:** [ ]
**Description:** Re-skin the existing header/bottom-nav shell (HN-2) using the HN-15 tokens: fixed header bar with the app name, Material Symbols icons in the bottom nav (`wb_sunny`/`calendar_today`) instead of emoji, Hungarian nav labels (`Mai nap`/`Naptár`).
**Acceptance criteria:**
- Header and nav use the new color/type tokens, not Angular defaults.
- No profile photo, greeting, streak, or settings icon yet (HN-17/18/19).
- `app.spec.ts` updated for the new Hungarian nav labels.
**Depends on:** HN-2, HN-15

### HN-17 — Greeting & date header on Today
**Status:** [ ]
**Description:** Time-of-day Hungarian greeting (e.g. "Jó estét!") and formatted date on the Today view, per the mockup — no personalized name, since the app has no accounts.
**Depends on:** HN-15

### HN-18 — Streak counter
**Status:** [ ]
**Description:** Show a "N napos" streak pill in the header, counting consecutive days with a saved entry, per the mockup.
**Depends on:** HN-4, HN-15

### HN-19 — Settings entry point
**Status:** [ ]
**Description:** A `/settings` route reachable from a header icon. Content TBD — first candidates are the export/import features from HN-13/HN-14.
**Depends on:** HN-15
