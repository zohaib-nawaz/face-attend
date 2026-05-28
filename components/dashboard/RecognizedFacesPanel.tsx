"use client";

import { useFaceRecognitionSession } from "@/components/face/FaceRecognitionProvider";
import { useFaceVerification } from "@/hooks/useFaceVerification";
import { useRecognizedFacesLog } from "@/hooks/useRecognizedFacesLog";
import { formatDateTimeLabel } from "@/utils/dateTime";
import { toCsv } from "@/utils/csv";
import { downloadTextFile } from "@/utils/download";

export function RecognizedFacesPanel({ timeZone }: Readonly<{ timeZone: string }>) {
  const recognition = useFaceRecognitionSession();
  const verification = useFaceVerification(recognition.lastMatch, {
    requiredSamples: 10,
    sampleWindowMs: 12_000,
    maxDistance: 0.6,
  });
  const attendance = useRecognizedFacesLog({
    lastMatch: recognition.lastMatch,
    isVerifiedLabel: verification.isVerifiedLabel,
  });

  const handleExportCsv = () => {
    const now = new Date();
    const filename = `attendance-${now.toISOString().slice(0, 10)}.csv`;
    const columns = [
      "label",
      "verifiedAtIso",
      "verifiedAtLocal",
      "lastSeenIso",
      "lastSeenLocal",
      "timeZone",
    ] as const;

    const rows = attendance.map((entry) => ({
      label: entry.label,
      verifiedAtIso: entry.verifiedAtIso,
      verifiedAtLocal: formatDateTimeLabel(entry.verifiedAtIso, { timeZone }),
      lastSeenIso: entry.lastSeenIso,
      lastSeenLocal: formatDateTimeLabel(entry.lastSeenIso, { timeZone }),
      timeZone,
    }));

    downloadTextFile({
      filename,
      contents: toCsv(rows, [...columns]),
      mimeType: "text/csv;charset=utf-8",
    });
  };

  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div className="text-sm font-semibold text-slate-900">Verification</div>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={attendance.length === 0}
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Export CSV
          </button>
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
            LIVE
          </span>
        </div>
      </div>
      <div className="h-px bg-slate-200" />

      <div className="flex-1 space-y-4 overflow-auto p-3">
        <div>
          <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Attendance (Present)
          </div>
          {attendance.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-600">
              No verified attendance yet.
            </div>
          ) : (
            <ul className="space-y-2">
              {attendance.map((entry) => (
                <li key={entry.label}>
                  <div className="flex items-start justify-between gap-3 rounded-lg p-3 hover:bg-slate-50">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">
                        {entry.label}
                      </div>
                      <div className="text-xs text-slate-500">
                        Verified:{" "}
                        {formatDateTimeLabel(entry.verifiedAtIso, { timeZone })}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-xs text-slate-400">
                        Last seen:{" "}
                        {formatDateTimeLabel(entry.lastSeenIso, { timeZone })}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="h-px bg-slate-200" />

        <div>
          <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Verification Progress
          </div>
        {verification.entries.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 p-4 text-sm text-slate-600">
            No faces ready for verification yet.
          </div>
        ) : (
          <ul className="space-y-2">
            {verification.entries.map((entry) => (
              <li key={entry.label}>
                <div className="flex items-start justify-between gap-3 rounded-lg p-3 hover:bg-slate-50">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">
                      {entry.label}
                    </div>
                    <div className="text-xs text-slate-500">
                      Samples {entry.samplesCollected}/{entry.requiredSamples}{" "}
                      {entry.isVerified ? "• Verified" : "• Checking…"}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-xs text-slate-400">
                      {formatDateTimeLabel(entry.lastSeenIso, { timeZone })}
                    </div>
                    <div className="mt-1 text-[11px] font-semibold text-slate-600">
                      d={entry.lastDistance.toFixed(2)}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        </div>
      </div>

      <div className="h-px bg-slate-200" />
      <div className="px-5 py-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="font-semibold text-slate-700">
            {recognition.isCameraActive ? "Camera On" : "Camera Off"}
          </span>
          <span className="font-semibold text-slate-700">
            Present: {attendance.length}
          </span>
        </div>
      </div>
    </section>
  );
}

