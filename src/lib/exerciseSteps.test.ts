import { describe, expect, it } from "vitest";
import { getExerciseSteps, getLastStepIndex, getStepAt } from "./exerciseSteps";

describe("exerciseSteps", () => {
  it("adds Enter as the final step", () => {
    const steps = getExerciseSteps("ab");

    expect(steps).toHaveLength(3);
    expect(steps[2]).toEqual({ kind: "enter", key: "enter", display: "↵" });
  });

  it("returns space as a space key step", () => {
    const spaceStep = getStepAt("a b", 1);

    expect(spaceStep).toMatchObject({ kind: "char", char: " ", key: "space" });
  });

  it("returns null for out-of-range index", () => {
    expect(getStepAt("ab", 5)).toBeNull();
    expect(getLastStepIndex("ab")).toBe(2);
  });
});
