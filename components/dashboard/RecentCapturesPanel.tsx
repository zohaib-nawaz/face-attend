import type { RecentCapture } from "@/types/dashboard";
import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatTimeLabel } from "@/utils/dateTime";

function getStatusTone(status: RecentCapture["status"]) {
  return status === "tardy" ? "warning" : "success";
}

function getStatusLabel(status: RecentCapture["status"]) {
  return status === "tardy" ? "Tardy" : "On Time";
}

export function RecentCapturesPanel({
  captures,
  timeZone,
}: Readonly<{
  captures: ReadonlyArray<RecentCapture>;
  timeZone: string;
}>) {
  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="text-sm font-semibold text-slate-900">Recent Captures</div>
        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
          LIVE
        </span>
      </div>
      <div className="h-px bg-slate-200" />

      <div className="flex-1 overflow-auto p-3">
        {captures.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 p-6 text-sm text-slate-600">
            No captures yet.
          </div>
        ) : (
          <ul className="space-y-2">
            {captures.map((capture) => (
              <li key={capture.id}>
                <div className="flex items-start gap-3 rounded-lg p-3 hover:bg-slate-50">
                  <Avatar src={capture.avatarUrl} alt={capture.fullName} size={40} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-slate-900">
                          {capture.fullName}
                        </div>
                        <div className="text-xs text-slate-500">{capture.studentId}</div>
                      </div>
                      <div className="shrink-0 text-xs text-slate-400">
                        {formatTimeLabel(capture.capturedAtIso, { timeZone })}
                      </div>
                    </div>
                    <div className="mt-2">
                      <StatusBadge tone={getStatusTone(capture.status)}>
                        {getStatusLabel(capture.status).toUpperCase()}
                      </StatusBadge>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="h-px bg-slate-200" />
      <div className="px-5 py-4 text-right">
        <a href="#" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
          View All Logs →
        </a>
      </div>
    </section>
  );
}

