export interface KeyboardKey {
  id: string;
  base: string;
  shift?: string;
  finger: number | null;
  wide?: boolean;
}

export const qwertzChRows: KeyboardKey[][] = [
  [
    { id: "caret", base: "§", shift: "°", finger: 1 },
    { id: "digit-1", base: "1", shift: "+", finger: 1 },
    { id: "digit-2", base: "2", shift: '"', finger: 2 },
    { id: "digit-3", base: "3", shift: "*", finger: 3 },
    { id: "digit-4", base: "4", shift: "ç", finger: 4 },
    { id: "digit-5", base: "5", shift: "%", finger: 4 },
    { id: "digit-6", base: "6", shift: "&", finger: 5 },
    { id: "digit-7", base: "7", shift: "/", finger: 5 },
    { id: "digit-8", base: "8", shift: "(", finger: 6 },
    { id: "digit-9", base: "9", shift: ")", finger: 7 },
    { id: "digit-0", base: "0", shift: "=", finger: 8 },
    { id: "apostrophe", base: "'", shift: "?", finger: 8 },
  ],
  [
    { id: "q", base: "q", finger: 1 },
    { id: "w", base: "w", finger: 2 },
    { id: "e", base: "e", finger: 3 },
    { id: "r", base: "r", finger: 4 },
    { id: "t", base: "t", finger: 4 },
    { id: "z", base: "z", finger: 5 },
    { id: "u", base: "u", finger: 5 },
    { id: "i", base: "i", finger: 6 },
    { id: "o", base: "o", finger: 7 },
    { id: "p", base: "p", finger: 8 },
    { id: "ue", base: "ü", shift: "Ü", finger: 8 },
    { id: "diaeresis", base: "¨", shift: "!", finger: 8 },
  ],
  [
    { id: "a", base: "a", finger: 1 },
    { id: "s", base: "s", finger: 2 },
    { id: "d", base: "d", finger: 3 },
    { id: "f", base: "f", finger: 4 },
    { id: "g", base: "g", finger: 4 },
    { id: "h", base: "h", finger: 5 },
    { id: "j", base: "j", finger: 5 },
    { id: "k", base: "k", finger: 6 },
    { id: "l", base: "l", finger: 7 },
    { id: "oe", base: "ö", shift: "Ö", finger: 8 },
    { id: "ae", base: "ä", shift: "Ä", finger: 8 },
  ],
  [
    { id: "y", base: "y", finger: 1 },
    { id: "x", base: "x", finger: 2 },
    { id: "c", base: "c", finger: 3 },
    { id: "v", base: "v", finger: 4 },
    { id: "b", base: "b", finger: 4 },
    { id: "n", base: "n", finger: 5 },
    { id: "m", base: "m", finger: 5 },
    { id: "comma", base: ",", shift: ";", finger: 6 },
    { id: "period", base: ".", shift: ":", finger: 7 },
    { id: "minus", base: "-", shift: "_", finger: 8 },
  ],
  [{ id: "space", base: "space", finger: null, wide: true }],
];

const DISPLAY_LABELS: Record<string, string> = {
  space: "␣",
};

export function keyDisplayLabel(key: KeyboardKey): string {
  return DISPLAY_LABELS[key.id] ?? key.base;
}

export function keyShiftLabel(key: KeyboardKey): string | null {
  if (!key.shift || key.wide) {
    return null;
  }
  return key.shift;
}

function charsForKey(key: KeyboardKey): string[] {
  const chars = [key.base, key.shift, DISPLAY_LABELS[key.id]]
    .filter((value): value is string => Boolean(value))
    .map((value) => normalizeTargetChar(value));
  return Array.from(new Set(chars));
}

export function keyMatchesTarget(key: KeyboardKey, targetKey: string): boolean {
  const expected = normalizeTargetChar(targetKey);
  if (!expected) {
    return false;
  }
  return charsForKey(key).includes(expected);
}

export function normalizeKey(input: string): string {
  if (input === " ") {
    return "space";
  }
  if (input.length === 1) {
    return input.toLowerCase();
  }
  return input.toLowerCase();
}

export function normalizeTargetChar(input: string): string {
  if (input === " ") {
    return "space";
  }
  if (input === "Ü") {
    return "ü";
  }
  if (input === "Ö") {
    return "ö";
  }
  if (input === "Ä") {
    return "ä";
  }
  if (input === "Ç") {
    return "ç";
  }
  return input.toLowerCase();
}
