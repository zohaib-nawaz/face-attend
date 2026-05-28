"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";

function PlaceholderCard({
  title,
  description,
  heightClassName,
}: Readonly<{ title: string; description: string; heightClassName: string }>) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="px-5 py-4">
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="mt-1 text-sm text-slate-600">{description}</div>
      </div>
      <div className="h-px bg-slate-200" />
      <div className={["p-5", heightClassName].join(" ")}>
        <div className="h-full rounded-lg bg-slate-100" />
      </div>
    </section>
  );
}

export default function AnalyticsPage() {
  return (
    <DashboardShell activeItemId="analytics">
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-lg font-semibold text-slate-900">Analytics</div>
          <div className="mt-1 text-sm text-slate-600">
            Visualize attendance trends, verification quality, and camera uptime.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <PlaceholderCard
            title="Attendance Trend"
            description="Daily check-ins over time (UI-only)."
            heightClassName="h-[320px]"
          />
          <PlaceholderCard
            title="Verification Quality"
            description="Distance distribution + match confidence (UI-only)."
            heightClassName="h-[320px]"
          />
          <PlaceholderCard
            title="Peak Hours"
            description="Busiest time windows (UI-only)."
            heightClassName="h-[320px]"
          />
          <PlaceholderCard
            title="Camera Health"
            description="Uptime, latency, and stream drops (UI-only)."
            heightClassName="h-[320px]"
          />
        </div>
      </div>
    </DashboardShell>
  );
}

