import type { Lesson, UiText } from "../domain/types";
import Button from "../components/Button";
import Panel from "../components/Panel";

interface PracticeIntroScreenProps {
  ui: UiText;
  lesson: Lesson;
  onBack: () => void;
  onStart: () => void;
}

function keyList(keys: string[]): string {
  return keys.length > 0 ? keys.join(" ") : "—";
}

export default function PracticeIntroScreen({
  ui,
  lesson,
  onBack,
  onStart,
}: PracticeIntroScreenProps) {
  return (
    <div className="mx-auto grid max-w-2xl gap-4">
      <Button variant="ghost" className="w-fit px-3 py-2 text-sm" onClick={onBack}>
        {ui.common.back}
      </Button>
      <Panel tone="soft">
        <h2 className="text-2xl">{lesson.title}</h2>
        <div className="mt-4 grid gap-2 text-(--ink-soft)">
          <p>
            {ui.practiceIntro.newKeys}:{" "}
            <span className="font-medium text-(--ink)">
              {keyList(lesson.newKeys)}
            </span>
          </p>
          <p>
            {ui.practiceIntro.reviewKeys}:{" "}
            <span className="font-medium text-(--ink)">
              {keyList(lesson.reviewKeys)}
            </span>
          </p>
          <p>
            {ui.practiceIntro.exercises}:{" "}
            <span className="font-medium text-(--ink)">
              {lesson.exercises.length}
            </span>
          </p>
        </div>
      </Panel>
      <Button variant="primary" block className="text-lg" onClick={onStart}>
        {ui.practiceIntro.start}
      </Button>
    </div>
  );
}
