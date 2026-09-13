# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Hálanapló ("gratitude journal") is an Angular PWA gratitude journal app for personal, single-user use on mobile.

- No backend, no login/auth screen — local device storage only.
- Daily entry: exactly 3 gratitude items + a daily mood/status.
- Calendar view to browse past entries.
- Single user, not a multi-tenant or public-facing product — skip auth, accounts, and sync concerns unless explicitly asked for.

## Commands

Requires Node.js (managed via nvm-windows in this environment; `nvm use 24.21.0` if `node`/`npm` aren't found — the tool's PATH doesn't persist across shell invocations, so re-export it each time: `$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")`).

- `npm start` — serve the dev build with live reload (`ng serve`)
- `npm run build` — production build to `dist/halanaplo` (includes the service worker)
- `npm run watch` — development-configuration build with `--watch`
- `npm test` — run unit tests (Vitest via `@angular/build:unit-test`)
- `npm test -- <path or name filter>` — run a subset of tests (Vitest CLI filtering)
- `ng generate component <path>` — scaffold a new component (SCSS inline styles by default, per `angular.json` schematics config)

## Architecture

Standard Angular CLI (v22) application, generated with `@angular/build` (esbuild-based builder, not the legacy webpack builder) and `@angular/pwa`.

- `src/main.ts` — bootstraps the app via `src/app/app.config.ts` (standalone app config, no `NgModule`).
- `src/app/app.routes.ts` — route table; add the `/today` and `/calendar` routes here as they're built.
- `public/` — static assets served as-is, including `manifest.webmanifest` and the generated PWA icon set (`public/icons/`).
- `ngsw-config.json` — Angular service worker caching config; only applied in the `production` build configuration (see `angular.json`), not in `ng serve`/development builds.
- No backend/API layer exists or is planned — all persistence is local to the device (per the ticket backlog in `TICKETS.md`, via IndexedDB).

See `TICKETS.md` for the feature backlog and build order.
