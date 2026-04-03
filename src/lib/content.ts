import lessonsRaw from "../content/lessons.de.json";
import uiRaw from "../content/ui.de.json";
import type { Lesson, LessonsFile, UiText } from "../domain/types";
import { normalizeTargetChar } from "./keyboard";

const lessonsData = lessonsRaw as LessonsFile;
const uiData = uiRaw as UiText;

const REQUIRED_CHARSET = new Set([
  "space",
  ".",
  ",",
  "!",
  "?",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "ä",
  "ö",
  "ü",
]);

function assertTargetTextRules(data: LessonsFile): void {
  const seen = new Set<string>();

  for (const lesson of data.lessons) {
    for (const exercise of lesson.exercises) {
      for (const char of exercise.targetText) {
        if (/\d/u.test(char)) {
          throw new Error(
            `Digits are not allowed in target text (${lesson.id}/${exercise.id}).`,
          );
        }

        const normalized = normalizeTargetChar(char);
        if (normalized) {
          seen.add(normalized);
        }
      }
    }
  }

  const missing = Array.from(REQUIRED_CHARSET).filter((char) => !seen.has(char));
  if (missing.length > 0) {
    throw new Error(
      `Lessons are missing required characters: ${missing.join(", ")}.`,
    );
  }
}

function assertLessonsFile(data: LessonsFile): LessonsFile {
  if (data.language !== "de") {
    throw new Error("Lessons language must be de.");
  }
  if (data.keyboardLayout !== "qwertz-ch") {
    throw new Error("Keyboard layout must be qwertz-ch.");
  }
  if (!Array.isArray(data.lessons) || data.lessons.length === 0) {
    throw new Error("Lessons must be a non-empty array.");
  }
  assertTargetTextRules(data);
  return data;
}

export const lessonsFile = assertLessonsFile(lessonsData);
export const uiText = uiData;

export const lessonById = new Map<string, Lesson>(
  lessonsFile.lessons.map((lesson) => [lesson.id, lesson]),
);

export function getLessonById(lessonId: string): Lesson | undefined {
  return lessonById.get(lessonId);
}

export function getNextLessonId(currentLessonId: string): string | null {
  const index = lessonsFile.lessons.findIndex(
    (lesson) => lesson.id === currentLessonId,
  );
  if (index === -1 || index + 1 >= lessonsFile.lessons.length) {
    return null;
  }
  return lessonsFile.lessons[index + 1].id;
}

export function format(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key: string) =>
    String(vars[key] ?? ""),
  );
}
