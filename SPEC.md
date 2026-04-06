# CalmType MVP Specification

## Overview

CalmType is a fully client-side typing trainer for autistic children.

The system prioritizes:

- emotional safety
- predictability
- zero punishment
- meaningful language

## Critical Rules

1. No gamification
2. No scores or penalties
3. No red error states
4. No “wrong” feedback
5. No fake sentences
6. All UI and lessons in German
7. Code and architecture in English
8. German QWERTZ keyboard

---

## Tech Stack

- Must use pnpm instead of npm
- React
- TypeScript
- Vite
- localStorage
- Tailwindcss v4 for CSS

---

## Core Features

### Input Modes

- ignore (default)
- gentle-hint
- review

### Exercise Types

- single-key
- pattern
- real-word
- real-sentence

---

## UI Structure

Screens:

- Home
- Lesson List
- Practice Intro
- Exercise
- Pause
- Lesson Complete
- Settings
- Adult Panel

---

## UX Rules

- No flashing
- No punishment
- Calm colors
- Stable layout
- Short instructions

Allowed feedback:

- "Gut"
- "Das passt"
- "Weiter"

---

## Data Storage

localStorage keys:

- calmtype.settings
- calmtype.progress

---

## Keyboard

- Layout: de-qwertz
- Physical keyboard required
- Highlight keys visually

---

## Lesson Flow

Each lesson:

1. intro
2. key practice
3. patterns
4. words
5. sentences (optional)
6. completion

---

## Content Rules

Allowed:

- real German words
- real sentences

Forbidden:

- fake sentences
- random word chains

---

## Sentence Rule

If it looks like a sentence → it must be a real sentence.

---

## Accessibility

- keyboard navigation
- no flashing
- high contrast option

---

## Done Criteria

- all lessons implemented
- no punitive feedback
- works offline
- German UI everywhere
- local progress works
