export type ExerciseStep =
  | {
      kind: "char";
      char: string;
      key: string;
      display: string;
    }
  | {
      kind: "enter";
      key: "enter";
      display: "↵";
    };

function getKeyForChar(char: string): string {
  if (char === " ") {
    return "space";
  }
  return char;
}

export function getExerciseSteps(targetText: string): ExerciseStep[] {
  const charSteps: ExerciseStep[] = targetText.split("").map((char) => ({
    kind: "char",
    char,
    key: getKeyForChar(char),
    display: char,
  }));

  return [...charSteps, { kind: "enter", key: "enter", display: "↵" }];
}

export function getStepAt(
  targetText: string,
  charIndex: number,
): ExerciseStep | null {
  const steps = getExerciseSteps(targetText);
  return steps[charIndex] ?? null;
}

export function getLastStepIndex(targetText: string): number {
  return getExerciseSteps(targetText).length - 1;
}
