import type { PropsWithChildren, ReactNode } from "react";

interface LayoutProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  showHeader?: boolean;
}

export default function Layout({
  title,
  subtitle,
  actions,
  showHeader = true,
  children,
}: LayoutProps) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 md:px-8 md:py-10">
      {showHeader ? (
        <header className="rounded-2xl border border-[var(--line)] bg-[var(--panel)] px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.05)] md:px-7 md:py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-1 text-sm text-[var(--ink-soft)] md:text-base">
                  {subtitle}
                </p>
              ) : null}
            </div>
            {actions ? (
              <div className="flex items-center gap-2">{actions}</div>
            ) : null}
          </div>
        </header>
      ) : null}
      <main
        className={`flex-1 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4 md:p-6 ${
          showHeader ? "mt-6" : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
}
