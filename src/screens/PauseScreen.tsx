import type { UiText } from "../domain/types";
import Button from "../components/Button";

interface PauseScreenProps {
  ui: UiText;
  onResume: () => void;
  onLessons: () => void;
  onHome: () => void;
}

export default function PauseScreen({
  ui,
  onResume,
  onLessons,
  onHome,
}: PauseScreenProps) {
  return (
    <div className="mx-auto grid max-w-lg gap-3">
      <Button variant="primary" block className="text-lg" onClick={onResume}>
        {ui.pause.resume}
      </Button>
      <Button block className="text-lg" onClick={onLessons}>
        {ui.pause.lessonList}
      </Button>
      <Button block className="text-lg" onClick={onHome}>
        {ui.pause.home}
      </Button>
    </div>
  );
}
