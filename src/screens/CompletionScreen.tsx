import type { UiText } from "../domain/types";
import Button from "../components/Button";
import Panel from "../components/Panel";

interface CompletionScreenProps {
  ui: UiText;
  hasNext: boolean;
  onRepeat: () => void;
  onNext: () => void;
  onHome: () => void;
}

export default function CompletionScreen({
  ui,
  hasNext,
  onRepeat,
  onNext,
  onHome,
}: CompletionScreenProps) {
  return (
    <div className="mx-auto grid max-w-lg gap-3">
      <Panel className="mb-5 py-4 text-center text-lg">
        <p>{ui.complete.title}</p>
      </Panel>
      {hasNext ? (
        <Button variant="primary" block className="text-lg" onClick={onNext}>
          {ui.complete.next}
        </Button>
      ) : null}
      <Button block className="text-lg" onClick={onRepeat}>
        {ui.complete.repeat}
      </Button>
      <Button
        variant={hasNext ? "secondary" : "primary"}
        block
        className="text-lg"
        onClick={onHome}
      >
        {ui.complete.home}
      </Button>
    </div>
  );
}
