import type { UiText } from "../domain/types";
import Button from "../components/Button";
import Panel from "../components/Panel";

interface AdultPanelScreenProps {
  ui: UiText;
  confirmReset: boolean;
  onBack: () => void;
  onAskReset: () => void;
  onCancelReset: () => void;
  onConfirmReset: () => void;
}

export default function AdultPanelScreen({
  ui,
  confirmReset,
  onBack,
  onAskReset,
  onCancelReset,
  onConfirmReset,
}: AdultPanelScreenProps) {
  return (
    <div className="mx-auto grid max-w-2xl gap-4">
      <Button
        variant="ghost"
        className="w-fit px-3 py-2 text-sm"
        onClick={onBack}
      >
        {ui.common.back}
      </Button>

      <Panel tone="soft">
        <p className="text-(--ink-soft)">{ui.reset.resetDescription}</p>

        {!confirmReset ? (
          <Button variant="primary" className="mt-4" onClick={onAskReset}>
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
    </div>
  );
}
