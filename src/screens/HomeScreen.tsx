import type { UiText } from "../domain/types";
import Button from "../components/Button";

interface HomeScreenProps {
  ui: UiText;
  hasProgress: boolean;
  onContinue: () => void;
  onLessons: () => void;
  onSettings: () => void;
  onAdult: () => void;
}

export default function HomeScreen({
  ui,
  hasProgress,
  onContinue,
  onLessons,
  onSettings,
  onAdult,
}: HomeScreenProps) {
  return (
    <div className="mx-auto grid max-w-xl gap-3">
      <Button variant="primary" block className="justify-start text-lg" onClick={onContinue}>
        {ui.home.continue}
      </Button>
      <Button block className="justify-start text-lg" onClick={onLessons}>
        {ui.home.lessons}
      </Button>
      <Button block className="justify-start text-lg" onClick={onSettings}>
        {ui.home.settings}
      </Button>
      <Button block className="justify-start text-lg" onClick={onAdult}>
        {ui.home.adult}
      </Button>
      {!hasProgress ? (
        <p className="pt-3 text-center text-sm text-(--ink-soft)">
          {ui.home.noProgress}
        </p>
      ) : null}
    </div>
  );
}
