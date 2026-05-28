import type { DashboardStats } from "@/types/dashboard";
import { formatMilliseconds } from "@/utils/number";

function StatusPill({
  dotClassName,
  label,
}: Readonly<{ dotClassName: string; label: string }>) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
      <span className={["inline-block size-2 rounded-full", dotClassName].join(" ")} />
      <span>{label}</span>
    </span>
  );
}

export function StatusBar({
  stats,
  uptimeLabel,
  latencyMs,
}: Readonly<{
  stats: DashboardStats;
  uptimeLabel: string;
  latencyMs: number;
}>) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
      <div className="flex flex-wrap items-center gap-4">
        <StatusPill dotClassName="bg-emerald-500" label={`Total Checked: ${stats.totalChecked}`} />
        <StatusPill dotClassName="bg-slate-300" label={`Remaining: ${stats.remaining}`} />
        <StatusPill dotClassName="bg-amber-500" label={`Exceptions: ${stats.exceptions}`} />
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500">
        <span>{uptimeLabel}</span>
        <span>Latency: {formatMilliseconds(latencyMs)}</span>
      </div>
    </footer>
  );
}

