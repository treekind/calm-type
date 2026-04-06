import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  block?: boolean;
}

const baseClass =
  "inline-flex items-center justify-center rounded-lg border px-4 py-2.5 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--highlight) focus-visible:ring-offset-2 focus-visible:ring-offset-(--panel) disabled:cursor-not-allowed disabled:opacity-60";

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border-(--accent) bg-(--accent) text-white hover:bg-[#3f5a4b] active:bg-[#364f41]",
  secondary:
    "border-(--line) bg-(--bg-soft) text-(--ink) hover:bg-(--panel)",
  ghost:
    "border-(--line) bg-transparent text-(--ink-soft) hover:bg-(--bg-soft)",
};

export default function Button({
  variant = "secondary",
  block = false,
  className,
  type,
  ...props
}: ButtonProps) {
  const classes = [
    baseClass,
    variantClass[variant],
    block ? "w-full" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return <button type={type ?? "button"} className={classes} {...props} />;
}
