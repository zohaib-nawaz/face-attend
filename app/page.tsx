import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import {
  IconChartBar,
  IconClipboardList,
  IconCog,
  IconGraduationCap,
  IconUsers,
  IconVideo,
} from "@/components/ui/Icon";

export default function Home() {
  return (
    <main className="min-h-full">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-48 -top-48 size-[520px] rounded-full bg-indigo-400/18 blur-3xl" />
          <div className="absolute -right-48 top-20 size-[520px] rounded-full bg-cyan-400/12 blur-3xl" />
        </div>
      </div>

      <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex size-10 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500/15 to-cyan-500/15 text-slate-900 ring-1 ring-slate-200">
              <IconGraduationCap className="size-6" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-900">
                SecureAttend
              </div>
              <div className="text-xs text-slate-500">
                Face-based attendance & monitoring
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 sm:flex">
            <Link
              href="/attendance-logs"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Logs
            </Link>
            <Link
              href="/analytics"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Analytics
            </Link>
            <ButtonLink href="/live-monitor" variant="primary">
              Open dashboard
            </ButtonLink>
          </nav>

          <div className="sm:hidden">
            <ButtonLink href="/live-monitor" variant="primary" size="sm">
              Open
            </ButtonLink>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
              <span className="inline-flex size-2 rounded-full bg-indigo-500" />
              Real-time monitoring
            </div>

            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Secure, real-time attendance, powered by{" "}
              <span className="bg-linear-to-r from-indigo-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
                face recognition
              </span>
              .
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-base text-slate-600 sm:text-lg">
              Start a live session, confirm matches, and keep audit-ready logs in
              one clean dashboard.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/live-monitor" variant="primary">
                Start live monitoring
              </ButtonLink>
              <ButtonLink href="/live-attendance" variant="secondary">
                Take attendance
              </ButtonLink>
              <ButtonLink href="/student-directory" variant="ghost">
                View students
              </ButtonLink>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
              <span className="rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
                Live sessions
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
                Reviewable confirmations
              </span>
              <span className="rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
                Export-ready logs
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-linear-to-br from-indigo-200/60 via-white to-cyan-200/40 blur-2xl" />
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/60 px-5 py-3">
                <div className="text-sm font-semibold text-slate-900">
                  Dashboard preview
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Security Station 01
                </div>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-200/70">
                      <IconVideo className="size-5" />
                    </span>
                    Live Monitor
                  </div>
                  <div className="mt-3 h-24 rounded-lg bg-linear-to-br from-slate-100 via-white to-indigo-50 ring-1 ring-slate-200" />
                  <div className="mt-3 text-xs text-slate-500">
                    Stream, detect, and track in real time.
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-200/70">
                      <IconClipboardList className="size-5" />
                    </span>
                    Attendance
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-10/12 rounded bg-slate-100" />
                    <div className="h-3 w-9/12 rounded bg-slate-100" />
                    <div className="h-3 w-7/12 rounded bg-slate-100" />
                    <div className="h-3 w-8/12 rounded bg-slate-100" />
                  </div>
                  <div className="mt-3 text-xs text-slate-500">
                    Confirm matches and save records.
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-200 bg-white px-5 py-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-indigo-800 ring-1 ring-indigo-200/60">
                    <IconUsers className="size-4 text-indigo-600" />
                    Directory
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-cyan-900 ring-1 ring-cyan-200/60">
                    <IconChartBar className="size-4 text-cyan-700" />
                    Analytics
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 ring-1 ring-slate-200/70">
                    <IconCog className="size-4 text-slate-600" />
                    Config
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-200/70">
                <IconVideo className="size-6" />
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Live monitoring
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Run sessions with clear detections and operator-friendly
                  controls.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-200/70">
                <IconClipboardList className="size-6" />
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Confirmed attendance
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Review matches quickly and save reliable attendance records.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-800 ring-1 ring-cyan-200/70">
                <IconChartBar className="size-6" />
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Logs & analytics
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Review history and export logs when you need them.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-sm font-semibold text-slate-900">
                How it works
              </div>
              <div className="mt-1 max-w-2xl text-sm text-slate-600">
                A simple flow that stays fast in the real world—live sessions,
                confirmations, and exportable records.
              </div>
            </div>
            <div className="hidden sm:block">
              <ButtonLink href="/live-monitor" variant="primary" size="sm">
                Try Live Monitor
              </ButtonLink>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <span className="text-sm font-semibold">1</span>
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  Start a session
                </div>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                Open <span className="font-medium">Live Monitor</span>, connect a
                camera, and begin detection.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <span className="text-sm font-semibold">2</span>
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  Confirm attendance
                </div>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                Review matches, handle exceptions, and save attendance with
                confidence.
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-cyan-700 text-white">
                  <span className="text-sm font-semibold">3</span>
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  Review & export
                </div>
              </div>
              <div className="mt-3 text-sm text-slate-600">
                Use logs and analytics to review history and export when needed.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-indigo-50 via-white to-cyan-50 p-8">
            <div className="pointer-events-none absolute -right-24 -top-24 size-[220px] rounded-full bg-indigo-400/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-[220px] rounded-full bg-cyan-400/20 blur-2xl" />
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Ready to run a session?
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Open Live Monitor to start, then confirm and save attendance.
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/live-monitor" variant="primary">
                  Open Live Monitor
                </ButtonLink>
                <ButtonLink href="/live-attendance" variant="secondary">
                  Take attendance
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-slate-500 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} SecureAttend</div>
          <div className="flex items-center gap-4">
            <Link href="/system-config" className="hover:text-slate-900">
              System Config
            </Link>
            <Link href="/student-directory" className="hover:text-slate-900">
              Student Directory
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
