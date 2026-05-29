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
    <main className="min-h-full bg-white text-zinc-900">
      <SiteHeader />

      <Hero />

      <LogoStrip />

      <FeatureBento />

      <HowItWorks />

      <StatsBand />

      <Testimonial />

      <ClosingCta />

      <SiteFooter />
    </main>
  );
}

function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-900/5 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-900/10 transition-transform group-hover:-rotate-3">
            <IconGraduationCap className="size-5" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-zinc-900">
            SecureAttend
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { href: "#features", label: "Features" },
            { href: "#how", label: "How it works" },
            { href: "/analytics", label: "Analytics" },
            { href: "/attendance-logs", label: "Logs" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/live-attendance"
            className="hidden text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 sm:inline-flex sm:px-2"
          >
            Sign in
          </Link>
          <ButtonLink
            href="/live-monitor"
            variant="primary"
            size="sm"
            className="rounded-full bg-zinc-900 px-4 hover:bg-zinc-800 focus-visible:ring-zinc-400"
          >
            Open dashboard
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Aurora mesh + grid backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 -top-48 size-160 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.30),transparent)] blur-2xl" />
        <div className="absolute left-[8%] top-8 size-112 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.22),transparent)] blur-2xl" />
        <div className="absolute right-[4%] -top-8 size-120 rounded-full bg-[radial-gradient(closest-side,rgba(236,72,153,0.18),transparent)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(9,9,11,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(9,9,11,0.04)_1px,transparent_1px)] bg-size-[42px_42px] mask-[radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <Link
            href="#how"
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-900/10 bg-white/80 py-1 pl-1.5 pr-3 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur transition-colors hover:bg-white"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-2 py-0.5 text-[11px] font-semibold text-white">
              <span className="inline-flex size-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live
            </span>
            Face recognition that just works
            <span className="text-zinc-400 transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>

          <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-zinc-900 sm:text-6xl">
            Attendance, captured the
            <span className="relative whitespace-nowrap">
              {" "}
              <span className="bg-linear-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
                moment
              </span>
            </span>{" "}
            they walk in.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
            Run live sessions, confirm matches in a tap, and keep audit-ready
            logs — all in one calm, fast platform built for operators.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink
              href="/live-monitor"
              variant="primary"
              className="h-11 rounded-full bg-zinc-900 px-6 text-[15px] shadow-sm hover:bg-zinc-800 focus-visible:ring-zinc-400"
            >
              Open dashboard
            </ButtonLink>
            <ButtonLink
              href="/live-attendance"
              variant="secondary"
              className="h-11 rounded-full border-zinc-900/10 px-6 text-[15px] shadow-sm hover:bg-zinc-50"
            >
              Take attendance →
            </ButtonLink>
          </div>

          <p className="mt-5 text-xs font-medium text-zinc-500">
            No setup headaches · Works on any webcam · Export anytime
          </p>
        </div>

        <ProductPreview />
      </div>
    </section>
  );
}

function ProductPreview() {
  return (
    <div className="relative mx-auto mt-14 max-w-5xl">
      <div className="absolute -inset-x-10 -top-10 bottom-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(139,92,246,0.18),transparent)] blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-zinc-900/10 bg-white shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-900/5">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-zinc-900/5 bg-zinc-50/80 px-4 py-3">
          <span className="size-3 rounded-full bg-rose-400/80" />
          <span className="size-3 rounded-full bg-amber-400/80" />
          <span className="size-3 rounded-full bg-emerald-400/80" />
          <div className="ml-3 hidden items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-zinc-400 ring-1 ring-zinc-900/5 sm:flex">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            secureattend.app/live-monitor
          </div>
          <div className="ml-auto text-xs font-medium text-zinc-400">
            Station 01 · Live
          </div>
        </div>

        <div className="grid gap-4 p-4 lg:grid-cols-12 lg:p-5">
          {/* sidebar */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="space-y-1">
              {[
                { icon: IconVideo, label: "Live Monitor", active: true },
                { icon: IconClipboardList, label: "Attendance" },
                { icon: IconUsers, label: "Students" },
                { icon: IconChartBar, label: "Analytics" },
                { icon: IconCog, label: "Config" },
              ].map(({ icon: Icon, label, active }) => (
                <div
                  key={label}
                  className={[
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium",
                    active
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600",
                  ].join(" ")}
                >
                  <Icon className="size-4" />
                  {label}
                </div>
              ))}
            </div>
          </aside>

          {/* main */}
          <div className="lg:col-span-9">
            <div className="grid gap-3 sm:grid-cols-3">
              <StatTile label="Detected" value="177" delta="+12%" tone="violet" />
              <StatTile label="Confirmed" value="142" delta="+8%" tone="emerald" />
              <StatTile label="Exceptions" value="7" delta="-3%" tone="amber" />
            </div>

            <div className="mt-3 rounded-xl border border-zinc-900/5 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-zinc-900">
                  Attendance trend
                </div>
                <div className="text-xs font-medium text-zinc-400">
                  Last 7 days
                </div>
              </div>
              <TrendChart />
            </div>

            <div className="mt-3 rounded-xl border border-zinc-900/5 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-zinc-900">
                  Recent matches
                </div>
                <div className="text-xs font-medium text-emerald-600">
                  3 awaiting review
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  { name: "Ayesha K.", conf: "98%", ok: true },
                  { name: "Bilal R.", conf: "95%", ok: true },
                  { name: "Unknown", conf: "61%", ok: false },
                ].map((row) => (
                  <div
                    key={row.name}
                    className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2"
                  >
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-zinc-500 ring-1 ring-zinc-900/5">
                      {row.name.slice(0, 1)}
                    </span>
                    <span className="text-sm font-medium text-zinc-700">
                      {row.name}
                    </span>
                    <span
                      className={[
                        "ml-auto rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        row.ok
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700",
                      ].join(" ")}
                    >
                      {row.conf}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({
  label,
  value,
  delta,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  tone: "violet" | "emerald" | "amber";
}) {
  const dot = {
    violet: "bg-violet-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
  }[tone];
  return (
    <div className="rounded-xl border border-zinc-900/5 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
        <span className={`size-1.5 rounded-full ${dot}`} />
        {label}
      </div>
      <div className="mt-2 flex items-end justify-between">
        <div className="text-2xl font-semibold tracking-tight text-zinc-900">
          {value}
        </div>
        <div className="text-xs font-semibold text-zinc-400">{delta}</div>
      </div>
    </div>
  );
}

function TrendChart() {
  const points = [22, 30, 26, 38, 34, 48, 44];
  const max = 56;
  const w = 100;
  const h = 40;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - (p / max) * h] as const);
  const line = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return (
    <div className="mt-3">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
        className="h-28 w-full"
      >
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(139 92 246)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="rgb(139 92 246)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(139 92 246)" />
            <stop offset="100%" stopColor="rgb(56 189 248)" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#trendFill)" />
        <path
          d={line}
          fill="none"
          stroke="url(#trendLine)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-1 flex justify-between text-[10px] font-medium text-zinc-400">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </div>
  );
}

function LogoStrip() {
  return (
    <section className="border-y border-zinc-900/5 bg-zinc-50/60">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-6">
        <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
          Trusted by operations teams across campuses
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {["Northfield", "Lahore Tech", "Crescent", "Vista Labs", "Helix"].map(
            (name) => (
              <span
                key={name}
                className="text-sm font-semibold tracking-tight text-zinc-500"
              >
                {name}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function FeatureBento() {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold text-violet-600">Features</p>
        <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          Everything you need, nothing you don&apos;t.
        </h2>
        <p className="mt-3 text-pretty text-base leading-relaxed text-zinc-600">
          A focused toolkit for live monitoring, fast confirmations, and
          audit-ready reporting.
        </p>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-6 md:grid-rows-2">
        {/* Featured large card */}
        <article className="group relative overflow-hidden rounded-3xl border border-zinc-900/10 bg-zinc-900 p-7 text-white md:col-span-3 md:row-span-2">
          <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.55),transparent)] blur-xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.35),transparent)] blur-xl" />
          <div className="relative">
            <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <IconVideo className="size-6" />
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">
              Real-time live monitoring
            </h3>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
              Stream any webcam, detect faces instantly, and watch matches land
              on screen as people arrive — no refresh, no waiting.
            </p>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Detecting…</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live
                </span>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg bg-white/10 ring-1 ring-white/10"
                  >
                    <div className="m-2 h-2 rounded bg-white/15" />
                    <div className="mx-2 h-2 w-2/3 rounded bg-white/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>

        <FeatureCard
          className="md:col-span-3"
          icon={IconClipboardList}
          tone="emerald"
          title="One-tap confirmations"
          body="Review proposed matches and approve them in a single click. Exceptions are flagged, never lost."
        />

        <FeatureCard
          className="md:col-span-2"
          icon={IconChartBar}
          tone="sky"
          title="Clear analytics"
          body="Trends, accuracy, and attendance at a glance."
        />

        <FeatureCard
          className="md:col-span-1"
          icon={IconCog}
          tone="zinc"
          title="Configurable"
          body="Tune thresholds to your space."
        />
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  body,
  tone,
  className,
}: {
  icon: (props: { className?: string }) => React.ReactElement;
  title: string;
  body: string;
  tone: "emerald" | "sky" | "zinc";
  className?: string;
}) {
  const toneClass = {
    emerald: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    sky: "bg-sky-50 text-sky-600 ring-sky-100",
    zinc: "bg-zinc-100 text-zinc-600 ring-zinc-200",
  }[tone];
  return (
    <article
      className={[
        "group rounded-3xl border border-zinc-900/10 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
        className ?? "",
      ].join(" ")}
    >
      <span
        className={`inline-flex size-11 items-center justify-center rounded-2xl ring-1 ${toneClass}`}
      >
        <Icon className="size-6" />
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-900">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{body}</p>
    </article>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: IconVideo,
      title: "Start a session",
      body: "Point a webcam at the entrance and hit start. Detection begins immediately.",
    },
    {
      icon: IconUsers,
      title: "Match faces",
      body: "Each face is matched against your directory with a confidence score.",
    },
    {
      icon: IconClipboardList,
      title: "Confirm & export",
      body: "Approve matches in a tap and export clean, audit-ready logs anytime.",
    },
  ];
  return (
    <section id="how" className="border-t border-zinc-900/5 bg-zinc-50/60">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-violet-600">How it works</p>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            From doorway to dashboard in three steps.
          </h2>
        </div>

        <div className="relative mt-12 grid gap-6 md:grid-cols-3">
          <div className="pointer-events-none absolute inset-x-0 top-9 hidden border-t border-dashed border-zinc-300 md:block" />
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              <div className="relative z-10 mx-auto inline-flex size-18 items-center justify-center rounded-2xl border border-zinc-900/10 bg-white shadow-sm">
                <step.icon className="size-7 text-zinc-900" />
                <span className="absolute -right-2 -top-2 inline-flex size-6 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-zinc-900">
                {step.title}
              </h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-zinc-600">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [
    { value: "99.2%", label: "Match accuracy" },
    { value: "<300ms", label: "Detection latency" },
    { value: "10k+", label: "Faces per session" },
    { value: "100%", label: "Audit-ready logs" },
  ];
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-6">
      <div className="grid gap-y-10 rounded-3xl border border-zinc-900/10 bg-white px-6 py-10 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="bg-linear-to-r from-violet-600 to-sky-500 bg-clip-text text-4xl font-semibold tracking-tight text-transparent">
              {s.value}
            </div>
            <div className="mt-1.5 text-sm font-medium text-zinc-500">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
      <figure className="text-center">
        <blockquote className="text-balance text-2xl font-medium leading-snug tracking-tight text-zinc-900 sm:text-3xl">
          &ldquo;Sessions are smoother than ever. Operators confirm matches in
          seconds, and we always have clean logs when an audit comes
          knocking.&rdquo;
        </blockquote>
        <figcaption className="mt-6 flex items-center justify-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
            AD
          </span>
          <div className="text-left">
            <div className="text-sm font-semibold text-zinc-900">
              Assistant Director
            </div>
            <div className="text-xs text-zinc-500">Lahore Campus · Operations</div>
          </div>
        </figcaption>
      </figure>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6 sm:pb-28">
      <div className="relative isolate overflow-hidden rounded-4xl border border-zinc-900/10 bg-zinc-900 px-6 py-14 text-center shadow-2xl sm:px-10 sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 size-144 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.45),transparent)] blur-2xl" />
          <div className="absolute bottom-0 right-0 size-96 translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(closest-side,rgba(56,189,248,0.30),transparent)] blur-2xl" />
        </div>
        <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Ready to simplify your attendance operations?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty text-base text-white/70">
          Open the dashboard, start a session, then confirm and export logs in
          seconds.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink
            href="/live-monitor"
            variant="primary"
            className="h-11 rounded-full bg-white px-6 text-[15px] text-zinc-900 hover:bg-zinc-100 focus-visible:ring-white"
          >
            Open dashboard
          </ButtonLink>
          <ButtonLink
            href="/student-directory"
            variant="secondary"
            className="h-11 rounded-full border-white/20 bg-transparent px-6 text-[15px] text-white hover:bg-white/10"
          >
            Student directory →
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-zinc-900/5">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex size-8 items-center justify-center rounded-lg bg-zinc-900 text-white">
            <IconGraduationCap className="size-4" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-zinc-900">
            SecureAttend
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
          <Link href="/live-monitor" className="hover:text-zinc-900">
            Live monitor
          </Link>
          <Link href="/analytics" className="hover:text-zinc-900">
            Analytics
          </Link>
          <Link href="/system-config" className="hover:text-zinc-900">
            System config
          </Link>
          <Link href="/student-directory" className="hover:text-zinc-900">
            Directory
          </Link>
        </nav>
        <div className="text-xs text-zinc-400">
          © {new Date().getFullYear()} SecureAttend
        </div>
      </div>
    </footer>
  );
}
