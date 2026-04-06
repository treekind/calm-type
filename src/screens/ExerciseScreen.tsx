import ExerciseText from "../components/ExerciseText";
import KeyboardQwertz from "../components/KeyboardQwertz";
import Button from "../components/Button";
import Panel from "../components/Panel";
import type { Exercise, Lesson, SettingsState, UiText } from "../domain/types";

interface ExerciseScreenProps {
  ui: UiText;
  lesson: Lesson;
  exercise: Exercise;
  exerciseIndex: number;
  charIndex: number;
  settings: SettingsState;
  targetKey: string;
  hintLevel: number;
  hintMessage: string | null;
  onPause: () => void;
  onRepeat: () => void;
  onSkip: () => void;
}

export default function ExerciseScreen({
  ui,
  lesson,
  exercise,
  exerciseIndex,
  charIndex,
  settings,
  targetKey,
  hintLevel,
  hintMessage,
  onPause,
  onRepeat,
  onSkip,
}: ExerciseScreenProps) {
  return (
    <div className="grid gap-4">
      <Panel tone="soft" className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-(--ink-soft)">
          <span>{lesson.title}</span>
          <span>
            {ui.exercise.progress}: {exerciseIndex + 1}/
            {lesson.exercises.length}
          </span>
        </div>
        <p className="text-lg">{exercise.instruction}</p>
        <ExerciseText targetText={exercise.targetText} charIndex={charIndex} />
      </Panel>

      <Panel className="grid gap-2">
        <p className="text-sm text-(--ink-soft)">
          {ui.exercise.keyTarget}:{" "}
          <span className="font-medium text-(--ink)">
            {targetKey === "space" ? "␣" : targetKey}
          </span>
        </p>
        {hintMessage ? (
          <p className="text-sm text-(--ink-soft)">{hintMessage}</p>
        ) : null}
        <KeyboardQwertz
          targetKey={targetKey}
          showHints={settings.keyboardHints}
          showFingers={settings.fingerHints}
          hintLevel={hintLevel}
        />
      </Panel>

      <div className="grid gap-2 md:grid-cols-3">
        <Button onClick={onPause}>{ui.exercise.pause}</Button>
        <Button onClick={onRepeat}>{ui.exercise.repeat}</Button>
        <Button onClick={onSkip}>{ui.exercise.skip}</Button>
      </div>
    </div>
  );
}
