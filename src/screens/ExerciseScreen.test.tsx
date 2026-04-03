import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import type { Lesson } from "../domain/types";
import { uiText } from "../lib/content";
import { defaultSettings } from "../lib/storage";
import ExerciseScreen from "./ExerciseScreen";

const lesson: Lesson = {
  id: "lesson-x",
  order: 1,
  title: "F und J",
  newKeys: ["f", "j"],
  reviewKeys: [],
  exercises: [
    {
      id: "exercise-x",
      type: "single-key",
      instruction: "Drücke F.",
      targetText: "f",
      targetKeys: ["f"],
    },
  ],
};

describe("ExerciseScreen", () => {
  it("renders German exercise text and action buttons", () => {
    render(
      <ExerciseScreen
        ui={uiText}
        lesson={lesson}
        exercise={lesson.exercises[0]}
        exerciseIndex={0}
        charIndex={0}
        settings={defaultSettings}
        targetKey="f"
        hintLevel={0}
        hintMessage={null}
        onPause={vi.fn()}
        onRepeat={vi.fn()}
        onSkip={vi.fn()}
      />,
    );

    expect(screen.getByText("Drücke F.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: uiText.exercise.pause }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: uiText.exercise.repeat }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: uiText.exercise.skip }),
    ).toBeInTheDocument();
  });

  it("triggers action callbacks", async () => {
    const user = userEvent.setup();
    const onPause = vi.fn();
    const onRepeat = vi.fn();
    const onSkip = vi.fn();

    render(
      <ExerciseScreen
        ui={uiText}
        lesson={lesson}
        exercise={lesson.exercises[0]}
        exerciseIndex={0}
        charIndex={0}
        settings={defaultSettings}
        targetKey="f"
        hintLevel={0}
        hintMessage={null}
        onPause={onPause}
        onRepeat={onRepeat}
        onSkip={onSkip}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: uiText.exercise.pause }),
    );
    await user.click(
      screen.getByRole("button", { name: uiText.exercise.repeat }),
    );
    await user.click(
      screen.getByRole("button", { name: uiText.exercise.skip }),
    );

    expect(onPause).toHaveBeenCalledTimes(1);
    expect(onRepeat).toHaveBeenCalledTimes(1);
    expect(onSkip).toHaveBeenCalledTimes(1);
  });

  it("shows a calm hint message when provided", () => {
    render(
      <ExerciseScreen
        ui={uiText}
        lesson={lesson}
        exercise={lesson.exercises[0]}
        exerciseIndex={0}
        charIndex={0}
        settings={defaultSettings}
        targetKey="f"
        hintLevel={2}
        hintMessage={uiText.exercise.hintTryKey}
        onPause={vi.fn()}
        onRepeat={vi.fn()}
        onSkip={vi.fn()}
      />,
    );

    expect(screen.getByText(uiText.exercise.hintTryKey)).toBeInTheDocument();
  });
});
