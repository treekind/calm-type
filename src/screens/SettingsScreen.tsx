import type { SettingsState, UiText } from "../domain/types";
import Button from "../components/Button";
import Panel from "../components/Panel";

interface SettingsScreenProps {
  ui: UiText;
  settings: SettingsState;
  confirmReset: boolean;
  onBack: () => void;
  onChange: (next: Partial<SettingsState>) => void;
  onAskReset: () => void;
  onCancelReset: () => void;
  onConfirmReset: () => void;
}

interface ToggleRowProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

function ToggleRow({ label, checked, onToggle }: ToggleRowProps) {
  return (
    <button
      className="grid w-full grid-cols-[1fr_auto] items-center rounded-xl border border-(--line) bg-(--bg-soft) px-4 py-3 text-left hover:bg-(--panel)"
      onClick={onToggle}
    >
      <span className="text-left text-lg">{label}</span>
      <span
        className={[
          "h-6 w-11 rounded-full border p-0.5 transition-colors cursor-pointer",
          checked
            ? "border-(--accent) bg-(--accent-soft)"
            : "border-(--line) bg-(--panel)",
        ].join(" ")}
      >
        <span
          className={[
            "block h-[18px] w-[18px] rounded-full bg-(--ink) transition-transform cursor-pointer",
            checked ? "translate-x-[18px]" : "translate-x-0",
          ].join(" ")}
        />
      </span>
    </button>
  );
}

export default function SettingsScreen({
  ui,
  settings,
  confirmReset,
  onBack,
  onChange,
  onAskReset,
  onCancelReset,
  onConfirmReset,
}: SettingsScreenProps) {
  return (
    <div className="mx-auto grid max-w-2xl gap-3">
      <ToggleRow
        label={ui.settings.keyboardHints}
        checked={settings.keyboardHints}
        onToggle={() => onChange({ keyboardHints: !settings.keyboardHints })}
      />
      <ToggleRow
        label={ui.settings.fingerHints}
        checked={settings.fingerHints}
        onToggle={() => onChange({ fingerHints: !settings.fingerHints })}
      />
      <ToggleRow
        label={ui.settings.sentences}
        checked={settings.sentences}
        onToggle={() => onChange({ sentences: !settings.sentences })}
      />
      <ToggleRow
        label={ui.settings.highContrast}
        checked={settings.highContrast}
        onToggle={() => onChange({ highContrast: !settings.highContrast })}
      />

      <Panel tone="soft" className="mt-2">
        <p className="text-lg">{ui.settings.inputMode}</p>
        <div className="mt-3 grid gap-2">
          <button
            type="button"
            className={[
              "rounded-xl border px-3 py-2 text-left cursor-pointer",
              settings.inputMode === "ignore"
                ? "border-(--accent) bg-(--accent-soft)"
                : "border-(--line) bg-(--panel)",
            ].join(" ")}
            onClick={() => onChange({ inputMode: "ignore" })}
            aria-pressed={settings.inputMode === "ignore"}
          >
            {ui.settings.inputIgnore}
          </button>
          <button
            type="button"
            className={[
              "rounded-xl border px-3 py-2 text-left cursor-pointer",
              settings.inputMode === "gentle-hint"
                ? "border-(--accent) bg-(--accent-soft)"
                : "border-(--line) bg-(--panel)",
            ].join(" ")}
            onClick={() => onChange({ inputMode: "gentle-hint" })}
            aria-pressed={settings.inputMode === "gentle-hint"}
          >
            {ui.settings.inputGentle}
          </button>
        </div>
      </Panel>

      <Panel tone="soft">
        <p className="text-lg">{ui.reset.title}</p>

        {!confirmReset ? (
          <Button className="mt-4" onClick={onAskReset}>
            {ui.reset.reset}
          </Button>
        ) : (
          <div className="mt-4 space-y-3">
            <p>{ui.reset.resetConfirm}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" onClick={onConfirmReset}>
                {ui.common.yes}
              </Button>
              <Button onClick={onCancelReset}>{ui.common.no}</Button>
            </div>
          </div>
        )}
      </Panel>

      <Button variant="primary" block className="text-lg " onClick={onBack}>
        {ui.common.back}
      </Button>
    </div>
  );
}
