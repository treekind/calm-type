import { useEffect, useMemo, useState } from "react";
import Layout from "./components/Layout";
import type {
  Exercise,
  ProgressState,
  Screen,
  SettingsState,
} from "./domain/types";
import {
  getLessonById,
  getNextLessonId,
  lessonsFile,
  uiText,
} from "./lib/content";
import {
  getInputStepsForTarget,
  matchesInputStep,
} from "./lib/keyboard";
import {
  defaultProgress,
  defaultSettings,
  readProgress,
  readSettings,
  resetStorage,
  writeProgress,
  writeSettings,
} from "./lib/storage";
import AdultPanelScreen from "./screens/AdultPanelScreen";
import CompletionScreen from "./screens/CompletionScreen";
import ExerciseScreen from "./screens/ExerciseScreen";
import HomeScreen from "./screens/HomeScreen";
import LessonListScreen from "./screens/LessonListScreen";
import PauseScreen from "./screens/PauseScreen";
import PracticeIntroScreen from "./screens/PracticeIntroScreen";
import SettingsScreen from "./screens/SettingsScreen";

function findFirstOpenLessonId(completedLessonIds: string[]): string | null {
  const first = lessonsFile.lessons.find(
    (lesson) => !completedLessonIds.includes(lesson.id),
  );
  return first ? first.id : (lessonsFile.lessons[0]?.id ?? null);
}

function applySentenceFilter(
  exercises: Exercise[],
  sentencesEnabled: boolean,
): Exercise[] {
  if (sentencesEnabled) {
    return exercises;
  }
  return exercises.filter((exercise) => exercise.type !== "real-sentence");
}

function getExpectedKey(targetText: string, charIndex: number): string {
  const char = targetText[charIndex] ?? "";
  if (char === " ") {
    return "space";
  }
  return char;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [settings, setSettings] = useState<SettingsState>(() => ({
    ...defaultSettings,
    ...readSettings(),
  }));
  const [progress, setProgress] = useState<ProgressState>(() => ({
    ...defaultProgress,
    ...readProgress(),
  }));
  const [composeStepPending, setComposeStepPending] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    writeSettings(settings);
  }, [settings]);

  useEffect(() => {
    writeProgress(progress);
  }, [progress]);

  useEffect(() => {
    if (settings.highContrast) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }, [settings.highContrast]);

  const activeLessonId =
    screen.name === "practice-intro" ||
    screen.name === "exercise" ||
    screen.name === "pause" ||
    screen.name === "complete"
      ? screen.lessonId
      : progress.currentLessonId;
  const activeLesson = activeLessonId
    ? getLessonById(activeLessonId)
    : undefined;
  const activeExercises = useMemo(
    () =>
      activeLesson
        ? applySentenceFilter(activeLesson.exercises, settings.sentences)
        : [],
    [activeLesson, settings.sentences],
  );
  const activeExercise = activeExercises[progress.currentExerciseIndex];

  useEffect(() => {
    setComposeStepPending(false);
  }, [
    screen.name,
    activeLessonId,
    progress.currentExerciseIndex,
    progress.currentCharIndex,
  ]);

  useEffect(() => {
    if (screen.name !== "exercise" || !activeExercise) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const expectedChar = activeExercise.targetText[progress.currentCharIndex] ?? "";
      if (!expectedChar) {
        return;
      }

      const advanceProgress = () => {
        const nextCharIndex = progress.currentCharIndex + 1;
        if (nextCharIndex < activeExercise.targetText.length) {
          setProgress((current) => ({
            ...current,
            currentCharIndex: nextCharIndex,
          }));
          return;
        }

        const nextExerciseIndex = progress.currentExerciseIndex + 1;
        if (nextExerciseIndex < activeExercises.length) {
          setProgress((current) => ({
            ...current,
            currentExerciseIndex: nextExerciseIndex,
            currentCharIndex: 0,
          }));
          return;
        }

        const lessonId = screen.lessonId;
        const done = new Set(progress.completedLessonIds);
        done.add(lessonId);
        const nextLessonId = getNextLessonId(lessonId);
        setProgress((current) => ({
          ...current,
          completedLessonIds: Array.from(done),
          currentLessonId: nextLessonId,
          currentExerciseIndex: 0,
          currentCharIndex: 0,
        }));
        setScreen({ name: "complete", lessonId });
      };

      const steps = getInputStepsForTarget(expectedChar);
      const stepIndex = composeStepPending ? 1 : 0;
      const activeStep = steps[stepIndex] ?? steps[0];

      if (!matchesInputStep(activeStep, event.key)) {
        if (settings.inputMode === "gentle-hint") {
          setHintLevel((current) => (current === 0 ? 2 : Math.min(3, current + 1)));
        }
        return;
      }

      event.preventDefault();
      setHintLevel(0);

      if (steps.length > 1 && stepIndex === 0) {
        setComposeStepPending(true);
        return;
      }

      if (composeStepPending) {
        setComposeStepPending(false);
      }

      advanceProgress();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeExercise,
    activeExercises.length,
    composeStepPending,
    progress,
    screen,
    settings.inputMode,
  ]);

  function openLesson(lessonId: string) {
    setProgress((current) => {
      const shouldResume = current.currentLessonId === lessonId;
      return {
        ...current,
        currentLessonId: lessonId,
        currentExerciseIndex: shouldResume ? current.currentExerciseIndex : 0,
        currentCharIndex: shouldResume ? current.currentCharIndex : 0,
      };
    });
    setScreen({ name: "practice-intro", lessonId });
  }

  function startLesson(lessonId: string) {
    const lesson = getLessonById(lessonId);
    if (!lesson) {
      return;
    }
    const exercises = applySentenceFilter(lesson.exercises, settings.sentences);
    if (exercises.length === 0) {
      return;
    }
    setProgress((current) => {
      const nextExerciseIndex = Math.min(
        current.currentExerciseIndex,
        exercises.length - 1,
      );
      const activeTarget = exercises[nextExerciseIndex].targetText;
      const nextCharIndex = Math.min(
        current.currentCharIndex,
        Math.max(0, activeTarget.length - 1),
      );
      return {
        ...current,
        currentLessonId: lessonId,
        currentExerciseIndex: nextExerciseIndex,
        currentCharIndex: nextCharIndex,
      };
    });
    setHintLevel(0);
    setScreen({ name: "exercise", lessonId });
  }

  function continueFromHome() {
    const lessonId =
      progress.currentLessonId ??
      findFirstOpenLessonId(progress.completedLessonIds);
    if (!lessonId) {
      setScreen({ name: "lessons" });
      return;
    }
    setScreen({ name: "practice-intro", lessonId });
  }

  function repeatCurrentLesson(lessonId: string) {
    setProgress((current) => ({
      ...current,
      currentLessonId: lessonId,
      currentExerciseIndex: 0,
      currentCharIndex: 0,
    }));
    setHintLevel(0);
    setScreen({ name: "exercise", lessonId });
  }

  function nextLessonFromComplete(lessonId: string) {
    const nextLessonId = getNextLessonId(lessonId);
    if (!nextLessonId) {
      setScreen({ name: "home" });
      return;
    }
    setProgress((current) => ({
      ...current,
      currentLessonId: nextLessonId,
      currentExerciseIndex: 0,
      currentCharIndex: 0,
    }));
    setScreen({ name: "practice-intro", lessonId: nextLessonId });
  }

  function skipExercise() {
    if (!activeLesson) {
      return;
    }
    const exercises = applySentenceFilter(
      activeLesson.exercises,
      settings.sentences,
    );
    const nextExerciseIndex = progress.currentExerciseIndex + 1;
    if (nextExerciseIndex < exercises.length) {
      setProgress((current) => ({
        ...current,
        currentExerciseIndex: nextExerciseIndex,
        currentCharIndex: 0,
      }));
      setHintLevel(0);
      return;
    }
    const done = new Set(progress.completedLessonIds);
    done.add(activeLesson.id);
    setProgress((current) => ({
      ...current,
      completedLessonIds: Array.from(done),
      currentLessonId: getNextLessonId(activeLesson.id),
      currentExerciseIndex: 0,
      currentCharIndex: 0,
    }));
    setHintLevel(0);
    setScreen({ name: "complete", lessonId: activeLesson.id });
  }

  function resetExerciseProgress() {
    setHintLevel(0);
    setProgress((current) => ({ ...current, currentCharIndex: 0 }));
  }

  function updateSettings(next: Partial<SettingsState>) {
    setSettings((current) => ({ ...current, ...next }));
  }

  function doResetAll() {
    resetStorage();
    setSettings(defaultSettings);
    setProgress(defaultProgress);
    setConfirmReset(false);
    setScreen({ name: "home" });
  }

  const hasProgress =
    progress.currentLessonId !== null || progress.completedLessonIds.length > 0;

  let title = uiText.app.name;
  let subtitle = uiText.app.subtitle;
  let content: JSX.Element = (
    <HomeScreen
      ui={uiText}
      hasProgress={hasProgress}
      onContinue={continueFromHome}
      onLessons={() => setScreen({ name: "lessons" })}
      onSettings={() => setScreen({ name: "settings" })}
      onAdult={() => setScreen({ name: "adult" })}
    />
  );

  if (screen.name === "lessons") {
    title = uiText.lessonList.title;
    subtitle = uiText.app.subtitle;
    content = (
      <LessonListScreen
        ui={uiText}
        lessons={lessonsFile.lessons}
        progress={progress}
        onBack={() => setScreen({ name: "home" })}
        onOpenLesson={openLesson}
      />
    );
  }

  if (screen.name === "practice-intro") {
    const lesson = getLessonById(screen.lessonId);
    if (lesson) {
      title = uiText.practiceIntro.title;
      subtitle = lesson.title;
      content = (
        <PracticeIntroScreen
          ui={uiText}
          lesson={lesson}
          onBack={() => setScreen({ name: "lessons" })}
          onStart={() => startLesson(lesson.id)}
        />
      );
    }
  }

  if (screen.name === "exercise" && activeLesson && activeExercise) {
    const hintMessage =
      settings.inputMode === "gentle-hint" && hintLevel >= 2
        ? hintLevel >= 3
          ? uiText.exercise.hintLookKey
          : uiText.exercise.hintTryKey
        : null;

    title = activeLesson.title;
    subtitle = uiText.app.subtitle;
    content = (
      <ExerciseScreen
        ui={uiText}
        lesson={activeLesson}
        exercise={activeExercise}
        exerciseIndex={progress.currentExerciseIndex}
        charIndex={progress.currentCharIndex}
        settings={settings}
        targetKey={getExpectedKey(
          activeExercise.targetText,
          progress.currentCharIndex,
        )}
        hintLevel={hintLevel}
        hintMessage={hintMessage}
        onPause={() => setScreen({ name: "pause", lessonId: activeLesson.id })}
        onRepeat={resetExerciseProgress}
        onSkip={skipExercise}
      />
    );
  }

  if (screen.name === "pause") {
    title = uiText.pause.title;
    subtitle = uiText.app.subtitle;
    content = (
      <PauseScreen
        ui={uiText}
        onResume={() =>
          setScreen({ name: "exercise", lessonId: screen.lessonId })
        }
        onLessons={() => setScreen({ name: "lessons" })}
        onHome={() => setScreen({ name: "home" })}
      />
    );
  }

  if (screen.name === "complete") {
    title = uiText.complete.title;
    subtitle = uiText.app.subtitle;
    content = (
      <CompletionScreen
        ui={uiText}
        hasNext={Boolean(getNextLessonId(screen.lessonId))}
        onRepeat={() => repeatCurrentLesson(screen.lessonId)}
        onNext={() => nextLessonFromComplete(screen.lessonId)}
        onHome={() => setScreen({ name: "home" })}
      />
    );
  }

  if (screen.name === "settings") {
    title = uiText.settings.title;
    subtitle = uiText.app.subtitle;
    content = (
      <SettingsScreen
        ui={uiText}
        settings={settings}
        onBack={() => setScreen({ name: "home" })}
        onChange={updateSettings}
      />
    );
  }

  if (screen.name === "adult") {
    title = uiText.adult.title;
    subtitle = uiText.app.subtitle;
    content = (
      <AdultPanelScreen
        ui={uiText}
        confirmReset={confirmReset}
        onBack={() => {
          setConfirmReset(false);
          setScreen({ name: "home" });
        }}
        onAskReset={() => setConfirmReset(true)}
        onCancelReset={() => setConfirmReset(false)}
        onConfirmReset={doResetAll}
      />
    );
  }

  return (
    <Layout title={title} subtitle={subtitle}>
      {content}
    </Layout>
  );
}
