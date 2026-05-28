"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";

function StatCard({
  label,
  value,
  helper,
}: Readonly<{ label: string; value: string; helper: string }>) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{helper}</div>
    </div>
  );
}

export default function StudentDirectoryPage() {
  return (
    <DashboardShell activeItemId="student-directory">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-slate-900">Student Directory</div>
            <div className="mt-1 text-sm text-slate-600">
              Browse students, manage profiles, and review enrollment status.
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              placeholder="Search by name or ID..."
              className="h-10 w-[280px] rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
            <button
              type="button"
              className="h-10 rounded-md bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Add Student
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Students" value="—" helper="UI-only placeholder" />
          <StatCard label="Active" value="—" helper="UI-only placeholder" />
          <StatCard label="Pending" value="—" helper="UI-only placeholder" />
          <StatCard label="Archived" value="—" helper="UI-only placeholder" />
        </div>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div className="text-sm font-semibold text-slate-900">Students</div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
              <button
                type="button"
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50"
              >
                Filter
              </button>
              <button
                type="button"
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50"
              >
                Sort
              </button>
            </div>
          </div>
          <div className="h-px bg-slate-200" />

          <div className="p-5">
            <div className="rounded-lg border border-dashed border-slate-200 p-6 text-sm text-slate-600">
              This page is UI-only for now. Hook it up to real student data when ready.
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

