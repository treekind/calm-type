import type { UiText } from "../domain/types";
import Button from "../components/Button";

interface HomeScreenProps {
  ui: UiText;
  hasProgress: boolean;
  onContinue: () => void;
  onLessons: () => void;
  onSettings: () => void;
}

export default function HomeScreen({
  ui,
  hasProgress,
  onContinue,
  onLessons,
  onSettings,
}: HomeScreenProps) {
  return (
    <div className="mx-auto grid max-w-xl gap-3">
      <Button
        variant="primary"
        block
        className="justify-start text-lg"
        onClick={onContinue}
      >
        {hasProgress ? ui.home.continue : ui.common.start}
      </Button>
      <Button block className="justify-start text-lg" onClick={onLessons}>
        {ui.home.lessons}
      </Button>
      <Button block className="justify-start text-lg" onClick={onSettings}>
        {ui.home.settings}
      </Button>
    </div>
  );
}
