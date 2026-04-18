# CalmType

CalmType is a fully client-side typing trainer designed for autistic children.
It focuses on emotional safety, predictable flow, and low-friction motor learning instead of scores, penalties, or pressure.

## Why CalmType

- Calm, non-punitive typing practice
- Predictable lesson structure and stable UI
- German-first experience (UI + lesson content)
- Support for physical Swiss-German QWERTZ keyboards
- Local-only data storage

## Core Principles

- No gamification
- No scores or penalties
- No red error states and no "wrong" feedback
- No fake sentences
- No mixing of chunks and real words in the same exercise
- Calm visual design, short instructions, no flashing

## Features

- Lesson flow with intro, guided exercises, pause, and completion screens
- Exercise types: single key, chunk patterns, real words, and real sentences
- Lessons use a stable `5`-exercise rhythm with the last `2` exercises focused on broad review
- Each exercise uses exactly `5` words or `5` chunks for predictable pacing
- Input modes:
  - `ignore` (default)
  - `gentle-hint` (calm guidance on mismatch)
- Optional keyboard and finger hints using a Swiss-German QWERTZ layout
- High-contrast mode for accessibility
- Progress and settings persisted in `localStorage`

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

## License

This project is licensed under the MIT License. See `LICENSE` for details.
