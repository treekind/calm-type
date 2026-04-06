import type { HTMLAttributes } from "react";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "soft" | "info";
}

const toneClass: Record<NonNullable<PanelProps["tone"]>, string> = {
  default: "border-(--line) bg-(--panel)",
  soft: "border-(--line) bg-(--panel-soft)",
  info: "border-(--line) bg-(--accent-soft)",
};

export default function Panel({
  tone = "default",
  className,
  ...props
}: PanelProps) {
  const classes = [
    "rounded-2xl border p-4 md:p-5",
    toneClass[tone],
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes} {...props} />;
}
