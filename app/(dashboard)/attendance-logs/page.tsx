"use client";

import { StatusBar } from "@/components/dashboard/StatusBar";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function AttendanceLogsPage() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const dashboardState = useDashboardData();

  if (dashboardState.status === "loading") {
    return (
      <DashboardShell activeItemId="attendance-logs">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="h-[520px] rounded-xl border border-slate-200 bg-white p-6" />
          <div className="h-[520px] rounded-xl border border-slate-200 bg-white p-6" />
        </div>
      </DashboardShell>
    );
  }

  if (dashboardState.status === "error") {
    return (
      <DashboardShell activeItemId="attendance-logs">
        <div className="rounded-xl border border-rose-200 bg-white p-6">
          <div className="text-sm font-semibold text-slate-900">Unable to load logs</div>
          <p className="mt-2 text-sm text-slate-600">{dashboardState.message}</p>
        </div>
      </DashboardShell>
    );
  }

  const { stats, uptimeLabel, latencyMs, recentCaptures } = dashboardState.data;

  return (
    <DashboardShell
      activeItemId="attendance-logs"
      footer={<StatusBar stats={stats} uptimeLabel={uptimeLabel} latencyMs={latencyMs} />}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-slate-900">Attendance Logs</div>
            <div className="mt-1 text-sm text-slate-600">
              History view (UI-only). Export, filter, and audit past check-ins here.
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              placeholder="Search by name, ID, or date..."
              className="h-10 w-[300px] rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
            <button
              type="button"
              className="h-10 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Filters
            </button>
            <button
              type="button"
              className="h-10 rounded-md bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Export
            </button>
          </div>
        </div>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div className="text-sm font-semibold text-slate-900">Recent Captures (preview)</div>
            <span className="text-xs font-semibold text-slate-500">
              {recentCaptures.length} items
            </span>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="p-5">
            <div className="rounded-lg border border-dashed border-slate-200 p-6 text-sm text-slate-600">
              Hook this page to your database logs. Live attendance is now on{" "}
              <span className="font-mono">/live-attendance</span>.
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {recentCaptures.slice(0, 6).map((capture) => (
                <div
                  key={capture.id}
                  className="rounded-lg border border-slate-200 bg-white p-4"
                >
                  <div className="text-sm font-semibold text-slate-900">{capture.fullName}</div>
                  <div className="mt-1 text-xs text-slate-500">{capture.studentId}</div>
                  <div className="mt-3 text-xs text-slate-500">
                    Captured: {new Date(capture.capturedAtIso).toLocaleString(undefined, { timeZone })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

