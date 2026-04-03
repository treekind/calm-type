import type { Lesson, ProgressState, UiText } from "../domain/types";
import Button from "../components/Button";
import Panel from "../components/Panel";
import { format } from "../lib/content";

interface LessonListScreenProps {
  ui: UiText;
  lessons: Lesson[];
  progress: ProgressState;
  onBack: () => void;
  onOpenLesson: (lessonId: string) => void;
}

export default function LessonListScreen({
  ui,
  lessons,
  progress,
  onBack,
  onOpenLesson,
}: LessonListScreenProps) {
  return (
    <div className="space-y-4">
      <Button variant="ghost" className="px-3 py-2 text-sm" onClick={onBack}>
        {ui.common.back}
      </Button>
      <div className="space-y-3">
        {lessons.map((lesson) => {
          const isCompleted = progress.completedLessonIds.includes(lesson.id);
          const isCurrent = progress.currentLessonId === lesson.id;
          return (
            <Panel
              tone="soft"
              key={lesson.id}
              className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center"
            >
              <div>
                <p className="text-sm text-[var(--ink-soft)]">
                  {format(ui.lessonList.lessonLabel, { order: lesson.order })}
                </p>
                <h3 className="text-xl">{lesson.title}</h3>
                {isCompleted ? (
                  <p className="text-sm text-[var(--ink-soft)]">
                    {ui.lessonList.completed}
                  </p>
                ) : null}
              </div>
              <Button variant="primary" onClick={() => onOpenLesson(lesson.id)}>
                {isCurrent ? ui.lessonList.resume : ui.lessonList.start}
              </Button>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
