import {
  getKeyboardHintTargets,
  getRecommendedShiftSide,
  keyComposeLabel,
  keyDisplayLabel,
  keyMatchesTarget,
  keyShiftLabel,
  qwertzChRows,
} from "../lib/keyboard";

interface KeyboardQwertzProps {
  targetKey: string;
  showHints: boolean;
  showFingers: boolean;
  hintLevel?: number;
}

export default function KeyboardQwertz({
  targetKey,
  showHints,
  showFingers,
  hintLevel = 0,
}: KeyboardQwertzProps) {
  const effectiveShowHints = showHints || hintLevel >= 1;
  const effectiveShowFingers = showFingers || hintLevel >= 2;
  const hintTargets = getKeyboardHintTargets(targetKey);
  const isEnterTarget = targetKey === "enter";
  const shiftSide = getRecommendedShiftSide(targetKey);

  if (!effectiveShowHints) {
    return null;
  }

  return (
    <div className="space-y-2 rounded-xl border border-(--line) bg-(--bg-soft) p-3 md:p-4">
      {qwertzChRows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className={[
            "flex items-center justify-center gap-2",
            rowIndex === 1 ? "ml-4 md:ml-6" : "",
            rowIndex === 2 ? "ml-6 md:ml-9" : "",
            rowIndex === 3 ? "ml-8 md:ml-12" : "",
          ].join(" ")}
        >
          {rowIndex === 1 ? (
            <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-(--line) bg-(--panel) text-xs text-(--ink-soft) md:h-11 md:w-16 md:text-sm">
              Tab
            </div>
          ) : null}
          {rowIndex === 2 ? (
            <div className="flex h-10 w-16 items-center justify-center rounded-lg border border-(--line) bg-(--panel) text-xs text-(--ink-soft) md:h-11 md:w-20 md:text-sm">
              Caps
            </div>
          ) : null}
          {rowIndex === 3 ? (
            <div
              className={[
                "flex h-10 w-20 items-center justify-center rounded-lg border text-xs md:h-11 md:w-24 md:text-sm",
                shiftSide === "left"
                  ? "border-(--accent) bg-(--accent-soft) text-(--ink)"
                  : "border-(--line) bg-(--panel) text-(--ink-soft)",
              ].join(" ")}
            >
              Shift
            </div>
          ) : null}
          {row.map((key) => {
            const isTarget = hintTargets.some((hintTarget) =>
              keyMatchesTarget(key, hintTarget),
            );
            const shiftLabel = keyShiftLabel(key);
            const composeLabel = keyComposeLabel(key);
            const altLabelTop = key.alt?.[0] ?? null;
            const altLabelBottom = key.alt?.[1] ?? null;
            return (
              <div
                key={key.id}
                className={[
                  "relative flex h-10 items-center justify-center rounded-lg border text-sm md:h-11 md:text-base",
                  key.wide ? "w-56 md:w-80" : "w-10 md:w-11",
                  isTarget
                    ? "border-(--accent) bg-(--accent-soft) text-(--ink)"
                    : "border-(--line) bg-(--panel) text-(--ink-soft)",
                  hintLevel >= 3 && isTarget ? "animate-gentle-key-pulse" : "",
                ].join(" ")}
              >
                {altLabelTop ? (
                  <span className="pointer-events-none absolute left-1 top-0.5 text-[9px] leading-none text-(--ink-soft) md:text-[10px]">
                    {altLabelTop}
                  </span>
                ) : null}
                {shiftLabel ? (
                  <span className="pointer-events-none absolute right-1 top-0.5 text-[9px] leading-none text-(--ink-soft) md:text-[10px]">
                    {shiftLabel}
                  </span>
                ) : null}
                {composeLabel ? (
                  <span className="pointer-events-none absolute right-1 bottom-0.5 text-[9px] leading-none text-(--ink-soft) md:text-[10px]">
                    {composeLabel}
                  </span>
                ) : null}
                {altLabelBottom ? (
                  <span className="pointer-events-none absolute left-1 bottom-0.5 text-[9px] leading-none text-(--ink-soft) md:text-[10px]">
                    {altLabelBottom}
                  </span>
                ) : null}
                <span>{keyDisplayLabel(key)}</span>
                {effectiveShowFingers && key.finger ? (
                  <span className="absolute bottom-0.5 right-0.5 rounded-full bg-(--bg) px-1.5 py-0.5 text-[10px] leading-none">
                    {key.finger}
                  </span>
                ) : null}
              </div>
            );
          })}
          {rowIndex === 0 ? (
            <div className="flex h-10 w-16 items-center justify-center rounded-lg border border-(--line) bg-(--panel) text-xs text-(--ink-soft) md:h-11 md:w-20 md:text-sm">
              ⌫
            </div>
          ) : null}
          {rowIndex === 2 ? (
            <div
              className={[
                "flex h-10 w-16 items-center justify-center rounded-lg border text-xs md:h-11 md:w-20 md:text-sm",
                isEnterTarget
                  ? "border-(--accent) bg-(--accent-soft) text-(--ink)"
                  : "border-(--line) bg-(--panel) text-(--ink-soft)",
                hintLevel >= 3 && isEnterTarget ? "animate-gentle-key-pulse" : "",
              ].join(" ")}
            >
              Enter
            </div>
          ) : null}
          {rowIndex === 3 ? (
            <div
              className={[
                "flex h-10 w-24 items-center justify-center rounded-lg border text-xs md:h-11 md:w-28 md:text-sm",
                shiftSide === "right"
                  ? "border-(--accent) bg-(--accent-soft) text-(--ink)"
                  : "border-(--line) bg-(--panel) text-(--ink-soft)",
              ].join(" ")}
            >
              Shift
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
