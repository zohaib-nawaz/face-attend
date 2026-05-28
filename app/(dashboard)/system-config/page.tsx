"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";

function Field({
  label,
  helper,
  children,
}: Readonly<{ label: string; helper: string; children: React.ReactNode }>) {
  return (
    <label className="block">
      <div className="text-sm font-semibold text-slate-900">{label}</div>
      <div className="mt-1 text-sm text-slate-600">{helper}</div>
      <div className="mt-3">{children}</div>
    </label>
  );
}

export default function SystemConfigPage() {
  return (
    <DashboardShell activeItemId="system-config">
      <div className="flex flex-col gap-6">
        <div>
          <div className="text-lg font-semibold text-slate-900">System Config</div>
          <div className="mt-1 text-sm text-slate-600">
            UI-only settings screen for thresholds, camera selection, and retention rules.
          </div>
        </div>

        <section className="rounded-xl border border-slate-200 bg-white">
          <div className="px-5 py-4">
            <div className="text-sm font-semibold text-slate-900">Verification</div>
            <div className="mt-1 text-sm text-slate-600">
              Tune how strict the face verification process is.
            </div>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-2">
            <Field label="Max Distance" helper="Lower = stricter matching (e.g. 0.6).">
              <input
                type="number"
                step="0.01"
                defaultValue={0.6}
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </Field>
            <Field label="Required Samples" helper="How many clean samples before verified.">
              <input
                type="number"
                defaultValue={10}
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </Field>
            <Field label="Sample Window (ms)" helper="Rolling window for collecting samples.">
              <input
                type="number"
                defaultValue={12000}
                className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300"
              />
            </Field>
            <Field label="Auto-save Captures" helper="Save a frame when a label becomes verified.">
              <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2">
                <input type="checkbox" defaultChecked className="size-4" />
                <span className="text-sm text-slate-700">Enabled</span>
              </div>
            </Field>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="flex flex-wrap items-center justify-end gap-3 px-5 py-4">
            <button
              type="button"
              className="h-10 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Reset
            </button>
            <button
              type="button"
              className="h-10 rounded-md bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Save Changes
            </button>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}

