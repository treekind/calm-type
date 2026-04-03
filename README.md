# CalmType

CalmType is a fully client-side typing trainer designed for autistic children.
It focuses on emotional safety, predictable flow, and meaningful language instead of scores, penalties, or pressure.

## Why CalmType

- Calm, non-punitive typing practice
- Predictable lesson structure and stable UI
- German-first experience (UI + lesson content)
- Support for physical Swiss-German QWERTZ keyboards
- Local-only data storage with offline support

## Core Principles

- No gamification
- No scores or penalties
- No red error states and no "wrong" feedback
- No fake sentences or random word chains
- Calm visual design, short instructions, no flashing

## Features

- Lesson flow with intro, guided exercises, pause, and completion screens
- Exercise types: single key, patterns, real words, and real sentences
- Input modes:
  - `ignore` (default)
  - `gentle-hint` (calm guidance on mismatch)
- Optional keyboard and finger hints using a DE-QWERTZ layout
- High-contrast mode for accessibility
- Progress and settings persisted in `localStorage`
- Service worker registration for offline behavior

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Install

```bash
pnpm install
```

### Run in development

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

### Run tests

```bash
pnpm test
```

### Watch tests

```bash
pnpm test:watch
```

## Data and Privacy

CalmType stores app state locally in the browser only:

- `calmtype.settings`
- `calmtype.progress`

There is no backend, no account system, and no cloud sync in the MVP.

## Offline Support

The app registers a service worker (`public/sw.js`) to cache same-origin GET requests and improve resilience when offline.

## Content and Language

- UI text is stored in `src/content/ui.de.json`
- Lessons are stored in `src/content/lessons.de.json`
- Language is German (`de`)
- Keyboard layout is Swiss German QWERTZ (`ch-qwertz`)

## Development Notes

- Keep UX calm and predictable
- Preserve German-first content and DE-QWERTZ assumptions
- Avoid punitive feedback patterns
- Follow constraints documented in `SPEC.md`
