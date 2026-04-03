import type { HTMLAttributes } from "react";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "soft" | "info";
}

const toneClass: Record<NonNullable<PanelProps["tone"]>, string> = {
  default: "border-[var(--line)] bg-[var(--panel)]",
  soft: "border-[var(--line)] bg-[var(--panel-soft)]",
  info: "border-[var(--line)] bg-[var(--accent-soft)]",
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
