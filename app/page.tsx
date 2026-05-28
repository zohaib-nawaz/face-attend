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
    <main className="min-h-full bg-white">
      <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/70 backdrop-blur">
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

      <section className="relative isolate w-full">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-white" />
          <div className="absolute left-1/2 top-0 h-[560px] w-[1200px] -translate-x-1/2 -translate-y-28 bg-[radial-gradient(800px_circle_at_50%_0%,rgba(59,130,246,0.28),transparent_70%)] blur-2xl" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-white" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
          <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
            <span className="inline-flex size-2 rounded-full bg-indigo-500" />
            Face-based attendance & live monitoring
          </div>

          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Let’s make your attendance management{" "}
            <span className="bg-linear-to-r from-indigo-600 via-sky-600 to-cyan-600 bg-clip-text text-transparent">
              easier
            </span>
            .
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-slate-600 sm:text-lg">
            Run live sessions, confirm matches, and keep audit-ready logs in one
            clean platform.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/live-monitor" variant="primary">
              Open dashboard
            </ButtonLink>
            <ButtonLink href="/live-attendance" variant="secondary">
              Take attendance
            </ButtonLink>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-2 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
              <IconUsers className="size-4 text-indigo-600" />
              Directory
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
              <IconVideo className="size-4 text-cyan-700" />
              Live monitor
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
              <IconClipboardList className="size-4 text-emerald-700" />
              Attendance
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
              <IconChartBar className="size-4 text-sky-700" />
              Analytics
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
              <IconCog className="size-4 text-slate-600" />
              Config
            </span>
          </div>
        </div>

        <div className="relative mx-auto mt-10 max-w-5xl">
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-linear-to-br from-indigo-200/60 via-white to-cyan-200/40 blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/60 px-5 py-3">
              <div className="text-sm font-semibold text-slate-900">
                SecureAttend dashboard
              </div>
              <div className="text-xs font-medium text-slate-500">
                Live session: Station 01
              </div>
            </div>

            <div className="grid gap-4 p-5 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold text-slate-700">
                    Navigation
                  </div>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 font-medium text-indigo-900 ring-1 ring-indigo-200/60">
                      <IconVideo className="size-4 text-indigo-700" />
                      Live Monitor
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50">
                      <IconClipboardList className="size-4 text-emerald-700" />
                      Attendance
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50">
                      <IconUsers className="size-4 text-slate-700" />
                      Students
                    </div>
                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50">
                      <IconChartBar className="size-4 text-sky-700" />
                      Analytics
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-9">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="text-xs font-medium text-slate-500">
                      Detected today
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-slate-900">
                      177
                    </div>
                    <div className="mt-2 h-9 rounded-lg bg-linear-to-r from-indigo-100 via-sky-50 to-cyan-100 ring-1 ring-slate-200" />
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="text-xs font-medium text-slate-500">
                      Confirmed
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-slate-900">
                      142
                    </div>
                    <div className="mt-2 h-9 rounded-lg bg-linear-to-r from-emerald-100 via-white to-emerald-50 ring-1 ring-slate-200" />
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="text-xs font-medium text-slate-500">
                      Exceptions
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-slate-900">
                      7
                    </div>
                    <div className="mt-2 h-9 rounded-lg bg-linear-to-r from-rose-100 via-white to-amber-50 ring-1 ring-slate-200" />
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-900">
                      Attendance trend
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      Last 7 days
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-12 gap-2">
                    <div className="col-span-12 h-32 rounded-lg bg-linear-to-br from-slate-50 via-white to-indigo-50 ring-1 ring-slate-200" />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="text-sm font-semibold text-slate-900">
                      Live Monitor
                    </div>
                    <div className="mt-3 h-24 rounded-lg bg-linear-to-br from-slate-100 via-white to-indigo-50 ring-1 ring-slate-200" />
                    <div className="mt-3 text-xs text-slate-500">
                      Stream, detect, and track in real time.
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="text-sm font-semibold text-slate-900">
                      Quick confirmations
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="h-3 w-10/12 rounded bg-slate-100" />
                      <div className="h-3 w-9/12 rounded bg-slate-100" />
                      <div className="h-3 w-7/12 rounded bg-slate-100" />
                      <div className="h-3 w-8/12 rounded bg-slate-100" />
                    </div>
                    <div className="mt-3 text-xs text-slate-500">
                      Review matches and save records.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            Effortlessly manage your attendance operations with our{" "}
            <span className="font-semibold text-slate-900">
              all-in-one platform
            </span>
            . Simplify live sessions, improve accuracy, and focus on what truly
            matters.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <div className="mx-auto inline-flex size-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-200/70">
              <IconVideo className="size-6" />
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-900">
              Live sessions
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Monitor streams and detections in real time.
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <div className="mx-auto inline-flex size-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-200/70">
              <IconClipboardList className="size-6" />
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-900">
              Quick approvals
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Confirm matches fast with a clean review flow.
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm">
            <div className="mx-auto inline-flex size-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-800 ring-1 ring-cyan-200/70">
              <IconChartBar className="size-6" />
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-900">
              Clear insights
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Track trends and export logs when needed.
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-sm font-semibold text-slate-900">
              Solution multiple aspects
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Everything you need for secure, operator-friendly attendance.
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-indigo-50 via-white to-cyan-50 p-6 shadow-sm">
              <div className="pointer-events-none absolute -right-24 -top-24 size-[220px] rounded-full bg-indigo-400/20 blur-2xl" />
              <div className="text-sm font-semibold text-slate-900">
                Organized sessions
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Start live monitoring, review detections, and keep your session
                timeline clean.
              </div>
              <div className="mt-5 rounded-xl border border-slate-200 bg-white/70 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-700">
                    Session overview
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    Today
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-10/12 rounded bg-slate-100" />
                  <div className="h-3 w-9/12 rounded bg-slate-100" />
                  <div className="h-3 w-7/12 rounded bg-slate-100" />
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-indigo-50 p-6 shadow-sm">
              <div className="pointer-events-none absolute -left-24 -bottom-24 size-[220px] rounded-full bg-cyan-400/18 blur-2xl" />
              <div className="text-sm font-semibold text-slate-900">
                Reliable management
              </div>
              <div className="mt-1 text-sm text-slate-600">
                Confirm attendance with confidence, handle exceptions, and keep
                audit-ready records.
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white/70 p-4">
                  <div className="text-xs font-semibold text-slate-700">
                    Confirmed
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">
                    142
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white/70 p-4">
                  <div className="text-xs font-semibold text-slate-700">
                    Exceptions
                  </div>
                  <div className="mt-2 text-2xl font-semibold text-slate-900">
                    7
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-sm font-semibold text-slate-900">
              Simplify your productivity
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Designed to be fast for operators and friendly for admins.
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-700 ring-1 ring-indigo-200/70">
                <IconVideo className="size-4" />
              </span>
              Real-time feed
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-200/70">
                <IconClipboardList className="size-4" />
              </span>
              Confirmations
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-800 ring-1 ring-cyan-200/70">
                <IconChartBar className="size-4" />
              </span>
              Reporting
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              <span className="inline-flex size-7 items-center justify-center rounded-full bg-slate-100 text-slate-700 ring-1 ring-slate-200">
                <IconCog className="size-4" />
              </span>
              Configuration
            </span>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-sm font-semibold text-slate-900">
              What they say about us
            </div>
            <div className="mt-1 text-sm text-slate-600">
              Built for real classrooms and real operators.
            </div>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl gap-4 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-44 bg-linear-to-br from-slate-100 via-white to-indigo-50" />
              <div className="p-6">
                <div className="text-sm font-semibold text-slate-900">
                  Assistant Director
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  “SecureAttend has made sessions smoother—operators can confirm
                  matches quickly and we always have clean logs when we need
                  them.”
                </div>
                <div className="mt-4 text-xs font-medium text-slate-500">
                  Lahore Campus • Operations
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-indigo-50 via-white to-cyan-50 p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">
                Ready to simplify your operations?
              </div>
              <div className="mt-2 text-sm text-slate-600">
                Start a live monitoring session or take attendance in seconds.
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/live-monitor" variant="primary">
                  Start live monitoring
                </ButtonLink>
                <ButtonLink href="/live-attendance" variant="secondary">
                  Take attendance
                </ButtonLink>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                <span className="rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
                  Export-ready logs
                </span>
                <span className="rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
                  Operator-friendly UI
                </span>
                <span className="rounded-full bg-white/70 px-3 py-1 ring-1 ring-slate-200">
                  Fast confirmations
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-linear-to-br from-indigo-50 via-white to-cyan-50 p-8 shadow-sm">
            <div className="pointer-events-none absolute -right-24 -top-24 size-[240px] rounded-full bg-indigo-400/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 size-[240px] rounded-full bg-cyan-400/18 blur-2xl" />
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Ready to simplify your attendance operations?
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Open the dashboard, start a session, then confirm and export
                  logs anytime.
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/live-monitor" variant="primary">
                  Open dashboard
                </ButtonLink>
                <ButtonLink href="/student-directory" variant="secondary">
                  Student directory
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
