import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  block?: boolean;
}

const baseClass =
  "inline-flex items-center justify-center rounded-lg border px-4 py-2.5 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--highlight)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--panel)] disabled:cursor-not-allowed disabled:opacity-60";

const variantClass: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border-[var(--accent)] bg-[var(--accent)] text-white hover:bg-[#3f5a4b] active:bg-[#364f41]",
  secondary:
    "border-[var(--line)] bg-[var(--bg-soft)] text-[var(--ink)] hover:bg-[var(--panel)]",
  ghost:
    "border-[var(--line)] bg-transparent text-[var(--ink-soft)] hover:bg-[var(--bg-soft)]",
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
