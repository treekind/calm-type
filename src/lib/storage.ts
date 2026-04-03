import type { ProgressState, SettingsState } from "../domain/types";

const SETTINGS_KEY = "calmtype.settings";
const PROGRESS_KEY = "calmtype.progress";

export const defaultSettings: SettingsState = {
  keyboardHints: true,
  fingerHints: false,
  sentences: true,
  highContrast: false,
  inputMode: "ignore",
};

export const defaultProgress: ProgressState = {
  currentLessonId: null,
  currentExerciseIndex: 0,
  currentCharIndex: 0,
  completedLessonIds: [],
};

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function parseInputMode(value: unknown): SettingsState["inputMode"] {
  return value === "gentle-hint" ? "gentle-hint" : "ignore";
}

export function readSettings(): SettingsState {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return defaultSettings;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!isObject(parsed)) {
      return defaultSettings;
    }
    return {
      keyboardHints: parsed.keyboardHints === true,
      fingerHints: parsed.fingerHints === true,
      sentences: parsed.sentences !== false,
      highContrast: parsed.highContrast === true,
      inputMode: parseInputMode(parsed.inputMode),
    };
  } catch {
    return defaultSettings;
  }
}

export function writeSettings(settings: SettingsState): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function readProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) {
      return defaultProgress;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!isObject(parsed)) {
      return defaultProgress;
    }
    const completedLessonIds = Array.isArray(parsed.completedLessonIds)
      ? parsed.completedLessonIds.filter(
          (value): value is string => typeof value === "string",
        )
      : [];

    return {
      currentLessonId:
        typeof parsed.currentLessonId === "string"
          ? parsed.currentLessonId
          : null,
      currentExerciseIndex:
        typeof parsed.currentExerciseIndex === "number"
          ? Math.max(0, parsed.currentExerciseIndex)
          : 0,
      currentCharIndex:
        typeof parsed.currentCharIndex === "number"
          ? Math.max(0, parsed.currentCharIndex)
          : 0,
      completedLessonIds,
    };
  } catch {
    return defaultProgress;
  }
}

export function writeProgress(progress: ProgressState): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

export function resetStorage(): void {
  localStorage.removeItem(SETTINGS_KEY);
  localStorage.removeItem(PROGRESS_KEY);
}
