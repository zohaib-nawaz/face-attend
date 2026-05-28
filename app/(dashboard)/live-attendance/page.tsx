"use client";

import { RecentCapturesPanel } from "@/components/dashboard/RecentCapturesPanel";
import { RecognizedFacesPanel } from "@/components/dashboard/RecognizedFacesPanel";
import { StatusBar } from "@/components/dashboard/StatusBar";
import { FaceRecognitionProvider } from "@/components/face/FaceRecognitionProvider";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function LiveAttendancePage() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dashboardState = useDashboardData();

  if (dashboardState.status === "loading") {
    return (
      <DashboardShell activeItemId="live-attendance">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="h-[520px] rounded-xl border border-slate-200 bg-white p-6" />
          <div className="h-[520px] rounded-xl border border-slate-200 bg-white p-6" />
        </div>
      </DashboardShell>
    );
  }

  if (dashboardState.status === "error") {
    return (
      <DashboardShell activeItemId="live-attendance">
        <div className="rounded-xl border border-rose-200 bg-white p-6">
          <div className="text-sm font-semibold text-slate-900">Unable to load live attendance</div>
          <p className="mt-2 text-sm text-slate-600">{dashboardState.message}</p>
        </div>
      </DashboardShell>
    );
  }

  const { stats, uptimeLabel, latencyMs, recentCaptures } = dashboardState.data;

  return (
    <DashboardShell
      activeItemId="live-attendance"
      footer={<StatusBar stats={stats} uptimeLabel={uptimeLabel} latencyMs={latencyMs} />}
    >
      <FaceRecognitionProvider>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
          <RecentCapturesPanel captures={recentCaptures} timeZone={timeZone} />
          <RecognizedFacesPanel timeZone={timeZone} />
        </div>
      </FaceRecognitionProvider>
    </DashboardShell>
  );
}

