import { getExerciseSteps } from "../lib/exerciseSteps";

interface ExerciseTextProps {
  targetText: string;
  charIndex: number;
}

export default function ExerciseText({
  targetText,
  charIndex,
}: ExerciseTextProps) {
  const steps = getExerciseSteps(targetText);

  return (
    <p className="min-h-20 rounded-xl border border-(--line) bg-(--bg-soft) px-4 py-4 text-center text-2xl leading-relaxed tracking-wide md:min-h-24 md:text-3xl">
      {steps.map((step, index) => {
        const isDone = index < charIndex;
        const isActive = index === charIndex;
        return (
          <span
            key={`${step.display}-${index}`}
            className={[
              "transition-colors",
              isDone ? "text-(--char-done)" : "text-(--ink)",
              isActive
                ? "rounded-md border border-(--char-active-border) bg-(--char-active-bg) px-1 py-0.5 font-semibold text-(--char-active-ink) shadow-[0_0_0_1px_rgba(255,255,255,0.45)_inset]"
                : "",
              ].join(" ")}
          >
            {step.display === " " ? "\u00A0" : step.display}
          </span>
        );
      })}
    </p>
  );
}
