"use client";

import Image from "next/image";
import { useMemo } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { RecentCapturesPanel } from "@/components/dashboard/RecentCapturesPanel";
import { StatusBar } from "@/components/dashboard/StatusBar";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useDashboardData } from "@/hooks/useDashboardData";
import {
  IconChartBar,
  IconClipboardList,
  IconUsers,
  IconVideo,
} from "@/components/ui/Icon";

const WEEKLY_TREND = [
  { label: "Mon", value: 318 },
  { label: "Tue", value: 372 },
  { label: "Wed", value: 344 },
  { label: "Thu", value: 401 },
  { label: "Fri", value: 388 },
  { label: "Sat", value: 196 },
  { label: "Sun", value: 142 },
] as const;

const PEAK_HOURS = [
  { label: "7a", value: 38 },
  { label: "8a", value: 96 },
  { label: "9a", value: 72 },
  { label: "10a", value: 44 },
  { label: "11a", value: 31 },
  { label: "12p", value: 52 },
  { label: "1p", value: 40 },
  { label: "2p", value: 28 },
] as const;

export default function DashboardPage() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dashboardState = useDashboardData();

  if (dashboardState.status === "loading") {
    return (
      <DashboardShell activeItemId="dashboard">
        <DashboardSkeleton />
      </DashboardShell>
    );
  }

  if (dashboardState.status === "error") {
    return (
      <DashboardShell activeItemId="dashboard">
        <div className="rounded-xl border border-rose-200 bg-white p-6">
          <div className="text-sm font-semibold text-slate-900">
            Something went wrong
          </div>
          <p className="mt-2 text-sm text-slate-600">
            {dashboardState.message}
          </p>
        </div>
      </DashboardShell>
    );
  }

  const { liveFeed, recentCaptures, stats, uptimeLabel, latencyMs } =
    dashboardState.data;

  return (
    <DashboardShell
      activeItemId="dashboard"
      footer={
        <StatusBar
          stats={stats}
          uptimeLabel={uptimeLabel}
          latencyMs={latencyMs}
        />
      }
    >
      <div className="flex flex-col gap-6">
        <PageHeader />

        <StatGrid
          stats={stats}
          uptimeLabel={uptimeLabel}
          latencyMs={latencyMs}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="flex flex-col gap-6 xl:col-span-2">
            <TrendCard />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <LiveFeedSnapshot
                imageUrl={liveFeed.cameraImageUrl}
                locationLabel={liveFeed.locationLabel}
                streamStatus={liveFeed.streamStatus}
              />
              <PeakHoursCard />
            </div>
          </div>

          <div className="min-h-[420px] xl:col-span-1">
            <RecentCapturesPanel captures={recentCaptures} timeZone={timeZone} />
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function PageHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-slate-900">Dashboard</h1>
          <StatusBadge tone="success">LIVE</StatusBadge>
        </div>
        <p className="mt-1 text-sm text-slate-600">
          A real-time overview of attendance, streams, and verification health.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ButtonLink href="/attendance-logs" variant="secondary" size="sm">
          View logs
        </ButtonLink>
        <ButtonLink href="/live-monitor" variant="primary" size="sm">
          Open live monitor
        </ButtonLink>
      </div>
    </div>
  );
}

type StatTone = "indigo" | "emerald" | "amber" | "slate";

function StatGrid({
  stats,
  uptimeLabel,
  latencyMs,
}: Readonly<{
  stats: { totalChecked: number; remaining: number; exceptions: number };
  uptimeLabel: string;
  latencyMs: number;
}>) {
  const total = stats.totalChecked + stats.remaining;
  const attendanceRate =
    total > 0 ? Math.round((stats.totalChecked / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        tone="indigo"
        icon={<IconClipboardList className="size-5" />}
        label="Total checked in"
        value={stats.totalChecked.toLocaleString()}
        hint={`${attendanceRate}% of ${total.toLocaleString()} expected`}
        progress={attendanceRate}
      />
      <StatCard
        tone="slate"
        icon={<IconUsers className="size-5" />}
        label="Remaining"
        value={stats.remaining.toLocaleString()}
        hint="Not yet checked in"
      />
      <StatCard
        tone="amber"
        icon={<IconVideo className="size-5" />}
        label="Exceptions"
        value={stats.exceptions.toLocaleString()}
        hint="Need manual review"
      />
      <StatCard
        tone="emerald"
        icon={<IconChartBar className="size-5" />}
        label="Stream latency"
        value={`${latencyMs}ms`}
        hint={uptimeLabel}
      />
    </div>
  );
}

function StatCard({
  tone,
  icon,
  label,
  value,
  hint,
  progress,
}: Readonly<{
  tone: StatTone;
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
  progress?: number;
}>) {
  const toneIcon: Record<StatTone, string> = {
    indigo: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    amber: "bg-amber-50 text-amber-600 ring-amber-100",
    slate: "bg-slate-100 text-slate-600 ring-slate-200",
  };
  const toneBar: Record<StatTone, string> = {
    indigo: "bg-indigo-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    slate: "bg-slate-400",
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        <span
          className={`inline-flex size-9 items-center justify-center rounded-lg ring-1 ${toneIcon[tone]}`}
        >
          {icon}
        </span>
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
        {value}
      </div>
      {typeof progress === "number" ? (
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${toneBar[tone]}`}
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      ) : null}
      <div className="mt-2 text-xs text-slate-500">{hint}</div>
    </section>
  );
}

function TrendCard() {
  const values = WEEKLY_TREND.map((d) => d.value);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const total = values.reduce((sum, v) => sum + v, 0);

  const w = 100;
  const h = 36;
  const range = Math.max(1, max - min);
  const step = w / (values.length - 1);
  const coords = values.map((v, i) => {
    const x = i * step;
    const y = h - ((v - min) / range) * (h - 6) - 3;
    return [x, y] as const;
  });
  const line = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <div className="text-sm font-semibold text-slate-900">
            Attendance trend
          </div>
          <div className="mt-0.5 text-xs text-slate-500">Last 7 days</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-slate-900">
            {total.toLocaleString()}
          </div>
          <div className="text-xs font-medium text-emerald-600">
            +12% vs last week
          </div>
        </div>
      </div>
      <div className="h-px bg-slate-200" />
      <div className="px-5 py-5">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          className="h-44 w-full"
        >
          <defs>
            <linearGradient id="dashTrendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="rgb(99 102 241)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1="0"
              x2={w}
              y1={h * t}
              y2={h * t}
              stroke="rgb(226 232 240)"
              strokeWidth="0.4"
            />
          ))}
          <path d={area} fill="url(#dashTrendFill)" />
          <path
            d={line}
            fill="none"
            stroke="rgb(79 70 229)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {coords.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1"
              fill="rgb(79 70 229)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
        <div className="mt-2 flex justify-between text-xs font-medium text-slate-400">
          {WEEKLY_TREND.map((d) => (
            <span key={d.label}>{d.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PeakHoursCard() {
  const max = Math.max(...PEAK_HOURS.map((d) => d.value));
  return (
    <section className="flex flex-col rounded-xl border border-slate-200 bg-white">
      <div className="px-5 py-4">
        <div className="text-sm font-semibold text-slate-900">Peak hours</div>
        <div className="mt-0.5 text-xs text-slate-500">Check-ins by hour</div>
      </div>
      <div className="h-px bg-slate-200" />
      <div className="flex flex-1 items-end gap-2 px-5 py-5">
        {PEAK_HOURS.map((d) => {
          const heightPct = Math.round((d.value / max) * 100);
          const isPeak = d.value === max;
          return (
            <div
              key={d.label}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div className="flex h-28 w-full items-end">
                <div
                  className={[
                    "w-full rounded-t-md transition-all",
                    isPeak ? "bg-indigo-500" : "bg-indigo-200",
                  ].join(" ")}
                  style={{ height: `${heightPct}%` }}
                  title={`${d.value} check-ins`}
                />
              </div>
              <span className="text-[11px] font-medium text-slate-400">
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LiveFeedSnapshot({
  imageUrl,
  locationLabel,
  streamStatus,
}: Readonly<{
  imageUrl: string;
  locationLabel: string;
  streamStatus: "active" | "offline";
}>) {
  const isActive = streamStatus === "active";
  return (
    <section className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-sm font-semibold text-slate-900">Live feed</div>
        <StatusBadge tone={isActive ? "success" : "neutral"}>
          {isActive ? "ACTIVE" : "OFFLINE"}
        </StatusBadge>
      </div>
      <div className="h-px bg-slate-200" />
      <div className="relative aspect-video w-full bg-slate-900">
        <Image
          src={imageUrl}
          alt={locationLabel}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-slate-950/70 to-transparent p-4">
          <div className="flex items-center gap-2 text-xs font-medium text-white">
            <span className="inline-flex size-2 animate-pulse rounded-full bg-rose-500" />
            {locationLabel}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-xs text-slate-500">1080p • 24 fps</span>
        <ButtonLink href="/live-monitor" variant="ghost" size="sm">
          Open monitor →
        </ButtonLink>
      </div>
    </section>
  );
}

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="h-10 w-64 rounded bg-slate-100" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-32 rounded-xl bg-slate-100" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <div className="h-72 rounded-xl bg-slate-100" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="h-64 rounded-xl bg-slate-100" />
            <div className="h-64 rounded-xl bg-slate-100" />
          </div>
        </div>
        <div className="h-[420px] rounded-xl bg-slate-100 xl:col-span-1" />
      </div>
    </div>
  );
}
