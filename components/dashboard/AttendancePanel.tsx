"use client";

import { useEffect, useMemo, useState } from "react";

export type AttendanceItem = Readonly<{
  id: string;
  label: string;
  capturedAtIso: string | null;
  photoUrl: string;
}>;

type CapturesApiResponse = Readonly<{
  ok: boolean;
  captures?: ReadonlyArray<
    Readonly<{
      fileName: string;
      publicPath: string;
      label: string;
      capturedAtIso: string | null;
    }>
  >;
}>;

const DUMMY_PAKISTANI_NAMES = [
  // Boys
  "Ali Raza",
  "Ahmed Khan",
  "Hassan Raza",
  "Usman Ali",
  "Bilal Ahmed",
  "Hamza Khan",
  "Saad Ali",
  "Adeel Hussain",
  "Fahad Khan",
  "Zain Raza",
  "Abdullah Sheikh",
  "Shahzaib Ahmed",
  // Girls
  "Ayesha Khan",
  "Fatima Ali",
  "Hira Raza",
  "Zainab Ahmed",
  "Eman Khan",
  "Maryam Raza",
  "Sana Ali",
  "Iqra Ahmed",
  "Noor Fatima",
  "Laiba Khan",
  "Anaya Sheikh",
  "Mahnoor Ali",
] as const;

function formatTime(iso: string | null, timeZone: string) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone,
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

function formatDate(iso: string | null, timeZone: string) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      timeZone,
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

export function AttendancePanel({
  timeZone,
  liveItems,
}: Readonly<{ timeZone: string; liveItems: ReadonlyArray<AttendanceItem> }>) {
  const [isLoading, setIsLoading] = useState(true);
  const [recentItems, setRecentItems] = useState<AttendanceItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/captures", { cache: "no-store" });
        const json = (await res.json()) as CapturesApiResponse;
        const captures = json.ok && json.captures ? json.captures : [];
        const mapped: AttendanceItem[] = captures.map((c) => ({
          id: c.fileName,
          label: c.label,
          capturedAtIso: c.capturedAtIso,
          photoUrl: c.publicPath,
        }));
        if (!cancelled) setRecentItems(mapped);
      } catch {
        if (!cancelled) setRecentItems([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const items = useMemo(() => {
    const byId = new Map<string, AttendanceItem>();
    for (const item of liveItems) byId.set(item.id, item);
    for (const item of recentItems) if (!byId.has(item.id)) byId.set(item.id, item);
    return Array.from(byId.values()).sort((a, b) =>
      (b.capturedAtIso ?? "").localeCompare(a.capturedAtIso ?? ""),
    );
  }, [liveItems, recentItems]);

  return (
    <section className="flex h-full flex-col rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <div>
          <div className="text-sm font-semibold text-slate-900">Attendance</div>
          <div className="mt-0.5 text-xs text-slate-500">
            Verified students (photo + timestamp)
          </div>
        </div>
        <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-200/60">
          LIVE
        </span>
      </div>
      <div className="h-px bg-slate-200" />

      <div className="flex-1 overflow-auto p-3">
        {isLoading ? (
          <div className="rounded-lg border border-dashed border-slate-200 p-6 text-sm text-slate-600">
            Loading attendance…
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 p-6 text-sm text-slate-600">
            No attendance yet. Start the camera and verify a student.
          </div>
        ) : (
          <ul className="space-y-2">
            {items.map((item, index) => {
              const displayName =
                DUMMY_PAKISTANI_NAMES[index % DUMMY_PAKISTANI_NAMES.length];
              return (
              <li key={item.id}>
                <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 hover:bg-slate-50">
                  <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-linear-to-br from-slate-100 to-slate-200 ring-1 ring-slate-200">
                    <div className="text-sm font-semibold text-slate-700">
                      {displayName.slice(0, 1).toUpperCase()}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-slate-900">
                          {displayName}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">
                          {formatDate(item.capturedAtIso, timeZone)}
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200/60">
                          PRESENT
                        </span>
                        <div className="mt-1 text-xs font-medium text-slate-500">
                          {formatTime(item.capturedAtIso, timeZone)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="h-px bg-slate-200" />
      <div className="px-5 py-4 text-sm">
        <div className="flex items-center justify-between text-slate-700">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">{items.length}</span>
        </div>
      </div>
    </section>
  );
}

