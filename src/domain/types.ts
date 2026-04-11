export type InputMode = "ignore" | "gentle-hint";

export type ExerciseType =
  | "single-key"
  | "pattern"
  | "real-word"
  | "real-sentence";

export interface Exercise {
  id: string;
  type: ExerciseType;
  instruction: string;
  targetText: string;
}

export interface Lesson {
  id: string;
  order: number;
  title: string;
  newKeys: string[];
  reviewKeys: string[];
  exercises: Exercise[];
}

export interface LessonsFile {
  language: string;
  keyboardLayout: string;
  lessons: Lesson[];
}

export interface SettingsState {
  keyboardHints: boolean;
  fingerHints: boolean;
  sentences: boolean;
  highContrast: boolean;
  inputMode: InputMode;
}

export interface ProgressState {
  currentLessonId: string | null;
  currentExerciseIndex: number;
  currentCharIndex: number;
  completedLessonIds: string[];
}

export interface UiText {
  app: {
    name: string;
    subtitle: string;
  };
  common: {
    back: string;
    home: string;
    lessons: string;
    settings: string;
    adult: string;
    start: string;
    continue: string;
    close: string;
    yes: string;
    no: string;
  };
  home: {
    title: string;
    continue: string;
    lessons: string;
    settings: string;
    adult: string;
    noProgress: string;
  };
  lessonList: {
    title: string;
    start: string;
    resume: string;
    completed: string;
    lessonLabel: string;
  };
  practiceIntro: {
    title: string;
    newKeys: string;
    reviewKeys: string;
    exercises: string;
    start: string;
  };
  exercise: {
    pause: string;
    repeat: string;
    skip: string;
    progress: string;
    keyTarget: string;
    hintTryKey: string;
    hintLookKey: string;
  };
  pause: {
    title: string;
    resume: string;
    lessonList: string;
    home: string;
  };
  complete: {
    title: string;
    repeat: string;
    next: string;
    home: string;
  };
  settings: {
    title: string;
    keyboardHints: string;
    fingerHints: string;
    sentences: string;
    highContrast: string;
    inputMode: string;
    inputIgnore: string;
    inputGentle: string;
  };
  reset: {
    title: string;
    reset: string;
    resetConfirm: string;
    resetDescription: string;
  };
}

export type Screen =
  | { name: "home" }
  | { name: "lessons" }
  | { name: "practice-intro"; lessonId: string }
  | { name: "exercise"; lessonId: string }
  | { name: "pause"; lessonId: string }
  | { name: "complete"; lessonId: string }
  | { name: "settings" }
  | { name: "adult" };
