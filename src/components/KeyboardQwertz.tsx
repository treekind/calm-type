import {
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

  if (!effectiveShowHints) {
    return null;
  }

  return (
    <div className="space-y-2 rounded-xl border border-[var(--line)] bg-[var(--bg-soft)] p-3 md:p-4">
      {qwertzChRows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center justify-center gap-2">
          {row.map((key) => {
            const isTarget = keyMatchesTarget(key, targetKey);
            const shiftLabel = keyShiftLabel(key);
            return (
              <div
                key={key.id}
                className={[
                  "relative flex h-10 items-center justify-center rounded-lg border text-sm md:h-11 md:text-base",
                  key.wide ? "w-56 md:w-80" : "w-10 md:w-11",
                  isTarget
                    ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]"
                    : "border-[var(--line)] bg-[var(--panel)] text-[var(--ink-soft)]",
                  hintLevel >= 3 && isTarget ? "animate-gentle-key-pulse" : "",
                ].join(" ")}
              >
                {shiftLabel ? (
                  <span className="pointer-events-none absolute right-1 top-0.5 text-[9px] leading-none text-[var(--ink-soft)] md:text-[10px]">
                    {shiftLabel}
                  </span>
                ) : null}
                <span>{keyDisplayLabel(key)}</span>
                {effectiveShowFingers && key.finger ? (
                  <span className="absolute bottom-0.5 right-0.5 rounded-full bg-[var(--bg)] px-1.5 py-0.5 text-[10px] leading-none">
                    {key.finger}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
