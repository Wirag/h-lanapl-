# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Hálanapló ("gratitude journal") is an Angular PWA gratitude journal app for personal, single-user use on mobile. UI copy is Hungarian throughout.

- No backend, no login/auth screen — local device storage only (IndexedDB).
- Daily entry: exactly 3 gratitude items + a mood (5-value enum) + a streak counter.
- Calendar month view to browse and edit past entries; explicit Save button everywhere (no autosave).
- Single user, not a multi-tenant or public-facing product — skip auth, accounts, and sync concerns unless explicitly asked for.

## Commands

Requires Node.js (managed via nvm-windows in this environment; `nvm use 24.21.0` if `node`/`npm` aren't found — the tool's PATH doesn't persist across shell invocations, so re-export it each time: `$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")`).

- `npm start` — serve the dev build with live reload (`ng serve`)
- `npm run build` — production build to `dist/halanaplo` (includes the service worker; service worker is only active in this build, not in `ng serve`)
- `npm run watch` — development-configuration build with `--watch`
- `npm test` — run unit tests (Vitest via `@angular/build:unit-test`)
- `npm test -- --testNamePattern <pattern>` — run a subset of tests
- `ng generate component <path>` — scaffold a new component (SCSS inline styles by default, per `angular.json` schematics config)
- `node scripts/generate-icons.mjs` — regenerate `public/icons/*.png` and `public/favicon.png` from `scripts/icon-source.svg` (needs `sharp`: `npm install --no-save sharp` first, it's not a project dependency)

## Architecture

Standard Angular CLI (v22) application, generated with `@angular/build` (esbuild-based builder) and `@angular/pwa`. Standalone components throughout, signals for state (no NgRx/RxJS state management).

- `src/main.ts` → `src/app/app.config.ts` — app bootstrap; registers the `hu` locale and `withComponentInputBinding()` (route params bind directly to component `input()`s, e.g. `DayDetail.date`).
- `src/app/app.routes.ts` — `/today` (default), `/calendar`, `/calendar/:date` (guarded by `validDateGuard`, rejects future/invalid dates), `/settings`. `/today` and `/calendar/:date` carry `unsavedChangesGuard` (a `CanDeactivate` guard backed by each component's `hasUnsavedChanges()`).
- `src/app/core/` — framework-agnostic app logic, no components:
  - `models/journal-entry.model.ts` — `JournalEntry`, the `Mood` enum (`kimerult`/`borus`/`bekes`/`vidam`/`halas`) and `MOOD_OPTIONS` (label + Material Symbols icon per mood).
  - `services/entry-storage.service.ts` — the only place that touches IndexedDB (db name `halanaplo`, one object store `entries` keyed by date). Rejects saving future-dated entries.
  - `services/export-import.service.ts` — JSON export (Blob download) / import (merge-by-date) built on top of `EntryStorageService`.
  - `util/` — `date-utils.ts` (ISO date helpers), `streak.ts` (`computeStreak`), `greeting.ts` (time-of-day Hungarian greeting).
  - `guards/` — `unsavedChangesGuard`, `validDateGuard`.
- `src/app/shared/entry-form/` — the one component that actually reads/writes a `JournalEntry`: mood picker + 3 gratitude textareas + explicit Save button. Takes a `date` input and is reused by both `Today` (always today) and `calendar/day-detail/DayDetail` (any past date, via the router-bound `date` input) — this is the only place that duplication should be avoided; don't reimplement entry editing elsewhere.
- `src/app/today/`, `src/app/calendar/`, `src/app/calendar/day-detail/`, `src/app/settings/` — route components; thin wrappers around `EntryForm` plus page-specific chrome (greeting/streak header, month grid, export/import UI).
- `src/styles/_tokens.scss` — design tokens (CSS custom properties for colors/spacing/radii, SCSS mixins for the type scale) translated 1:1 from `design/DESIGN.md`. Every component SCSS file `@use`s this partial rather than hardcoding colors/fonts.
- `public/` — static assets served as-is: `manifest.webmanifest` (name/theme/icons), the PWA icon set (`public/icons/`), `favicon.ico`/`favicon.png`.
- `ngsw-config.json` — Angular service worker caching config; only applied in the `production` build configuration, not in `ng serve`.
- `src/test-setup.ts` — Vitest global setup (wired via `angular.json`'s `test.options.setupFiles`): polyfills `indexedDB` with `fake-indexeddb` and resets it before every test so specs don't leak state into each other, plus a `URL.createObjectURL` stub for the export service.
- `design/` — the visual design source (`DESIGN.md` token tables, `code.html`/`screen.png` mockup). Not part of the build; consult it before changing colors/typography rather than guessing new values.

No backend/API layer exists or is planned — all persistence is local to the device via `EntryStorageService`.

See `TICKETS.md` for the feature backlog and build order.
