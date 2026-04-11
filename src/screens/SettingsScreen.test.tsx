import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { uiText } from "../lib/content";
import { defaultSettings } from "../lib/storage";
import SettingsScreen from "./SettingsScreen";

describe("SettingsScreen", () => {
  it("calls onChange when a toggle is pressed", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SettingsScreen
        ui={uiText}
        settings={defaultSettings}
        confirmReset={false}
        onBack={vi.fn()}
        onChange={onChange}
        onAskReset={vi.fn()}
        onCancelReset={vi.fn()}
        onConfirmReset={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: uiText.settings.keyboardHints }),
    );

    expect(onChange).toHaveBeenCalledWith({ keyboardHints: false });
  });

  it("allows selecting the gentle input mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <SettingsScreen
        ui={uiText}
        settings={defaultSettings}
        confirmReset={false}
        onBack={vi.fn()}
        onChange={onChange}
        onAskReset={vi.fn()}
        onCancelReset={vi.fn()}
        onConfirmReset={vi.fn()}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: uiText.settings.inputGentle }),
    );

    expect(onChange).toHaveBeenCalledWith({ inputMode: "gentle-hint" });
    expect(screen.queryByText("Wiederholung")).not.toBeInTheDocument();
  });

  it("calls onAskReset when reset action is clicked", async () => {
    const user = userEvent.setup();
    const onAskReset = vi.fn();

    render(
      <SettingsScreen
        ui={uiText}
        settings={defaultSettings}
        confirmReset={false}
        onBack={vi.fn()}
        onChange={vi.fn()}
        onAskReset={onAskReset}
        onCancelReset={vi.fn()}
        onConfirmReset={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: uiText.reset.reset }));

    expect(onAskReset).toHaveBeenCalledTimes(1);
  });

  it("shows finger hints toggle when keyboard hints are enabled", () => {
    render(
      <SettingsScreen
        ui={uiText}
        settings={defaultSettings}
        confirmReset={false}
        onBack={vi.fn()}
        onChange={vi.fn()}
        onAskReset={vi.fn()}
        onCancelReset={vi.fn()}
        onConfirmReset={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: uiText.settings.fingerHints }),
    ).toBeInTheDocument();
  });

  it("hides finger hints toggle when keyboard hints are disabled", () => {
    render(
      <SettingsScreen
        ui={uiText}
        settings={{ ...defaultSettings, keyboardHints: false, fingerHints: false }}
        confirmReset={false}
        onBack={vi.fn()}
        onChange={vi.fn()}
        onAskReset={vi.fn()}
        onCancelReset={vi.fn()}
        onConfirmReset={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("button", { name: uiText.settings.fingerHints }),
    ).not.toBeInTheDocument();
  });
});
