"use client";

import { LiveFeedCard } from "@/components/dashboard/LiveFeedCard";
import { StatusBar } from "@/components/dashboard/StatusBar";
import { FaceRecognitionProvider } from "@/components/face/FaceRecognitionProvider";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function LiveMonitorPage() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dashboardState = useDashboardData();

  if (dashboardState.status === "loading") {
    return (
      <DashboardShell activeItemId="live-monitor">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="h-4 w-52 rounded bg-slate-100" />
          <div className="mt-4 h-[52vh] min-h-[320px] rounded-lg bg-slate-100" />
          <div className="mt-4 h-10 w-72 rounded bg-slate-100" />
        </div>
      </DashboardShell>
    );
  }

  if (dashboardState.status === "error") {
    return (
      <DashboardShell activeItemId="live-monitor">
        <div className="rounded-xl border border-rose-200 bg-white p-6">
          <div className="text-sm font-semibold text-slate-900">Something went wrong</div>
          <p className="mt-2 text-sm text-slate-600">{dashboardState.message}</p>
        </div>
      </DashboardShell>
    );
  }

  const { liveFeed, stats, uptimeLabel, latencyMs } = dashboardState.data;

  return (
    <DashboardShell
      activeItemId="live-monitor"
      footer={<StatusBar stats={stats} uptimeLabel={uptimeLabel} latencyMs={latencyMs} />}
    >
      <FaceRecognitionProvider>
        <LiveFeedCard liveFeed={liveFeed} timeZone={timeZone} />
      </FaceRecognitionProvider>
    </DashboardShell>
  );
}

