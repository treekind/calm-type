# CalmType MVP Specification

## Overview

CalmType is a fully client-side typing trainer for autistic children.

The system prioritizes:

- emotional safety
- predictability
- zero punishment
- meaningful teaching structure

## Critical Rules

1. No gamification
2. No scores or penalties
3. No red error states
4. No “wrong” feedback
5. No fake sentences
6. All UI and lessons in German
7. Code and architecture in English
8. Swiss-German QWERTZ keyboard

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
- pattern (chunk-only)
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
2. 5 exercises
3. early exercises introduce and vary the new keys with chunks
4. middle exercises use real words when practical
5. sentences are optional and only used when they are real and natural
6. the last 2 exercises are broad review with previously learned keys
7. completion

---

## Content Rules

Allowed:

- meaningful chunks for motor learning
- real German words
- real sentences

Forbidden:

- fake sentences
- random word chains
- mixing chunks and real words in the same exercise
- mixing chunks and real sentences in the same exercise

Exercise rules:

- each lesson keeps its key introduction order
- each lesson has 5 exercises
- each exercise has exactly 5 words or 5 chunks
- pattern exercises are chunk-only
- real-word exercises are word-only
- real-sentence exercises are sentence-only
- the last 2 exercises should review as many previously learned keys as practical

---

## Sentence Rule

If it looks like a sentence → it must be a real sentence.

If a real word or real sentence is not practical yet, use meaningful chunks that support a clear teaching goal:

- home-row anchors
- hand alternation
- new key reach
- word stems or syllable-like chunks

---

## Accessibility

- keyboard navigation
- no flashing
- high contrast option

---

## Done Criteria

- all lessons implemented
- no punitive feedback
- German UI everywhere
- local progress works
