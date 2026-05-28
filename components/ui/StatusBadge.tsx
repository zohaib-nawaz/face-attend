import type { PropsWithChildren } from "react";

export type StatusBadgeTone = "success" | "warning" | "neutral";

export function StatusBadge({
  tone,
  children,
}: Readonly<{ tone: StatusBadgeTone } & PropsWithChildren>) {
  const className =
    tone === "success"
      ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100"
      : tone === "warning"
        ? "bg-amber-50 text-amber-800 ring-1 ring-amber-100"
        : "bg-slate-100 text-slate-700 ring-1 ring-slate-200";

  return (
    <span className={["inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium", className].join(" ")}>
      <span className="inline-block size-1.5 rounded-full bg-current opacity-70" />
      <span>{children}</span>
    </span>
  );
}

