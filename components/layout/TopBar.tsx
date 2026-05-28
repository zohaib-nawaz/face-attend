import { IconBell, IconHelpCircle, IconSearch, IconUserCircle } from "@/components/ui/Icon";

type TopBarProps = Readonly<{
  onMenuClick?: () => void;
}>;

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d="M4 6h16M4 12h16M4 18h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 grid h-16 grid-cols-[1fr_auto] items-center border-b border-slate-200 bg-white px-4 md:grid-cols-[1fr_auto_1fr] md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className={[
            "inline-flex size-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 md:hidden",
            onMenuClick ? "" : "pointer-events-none opacity-0",
          ].join(" ")}
        >
          <IconMenu />
        </button>
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          SecureAttend
        </span>
      </div>

      <div className="hidden md:flex items-center justify-center">
        <label className="relative">
          <span className="sr-only">Search logs</span>
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            inputMode="search"
            placeholder="Search logs..."
            className={[
              "h-10 w-[360px] rounded-md border border-slate-200 bg-slate-100/70 pl-9 pr-3 text-sm text-slate-900",
              "placeholder:text-slate-500",
              "focus:outline-none focus:ring-2 focus:ring-slate-300",
            ].join(" ")}
          />
        </label>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Notifications"
          className="inline-flex size-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100"
        >
          <IconBell className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Help"
          className="inline-flex size-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100"
        >
          <IconHelpCircle className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Account"
          className="inline-flex size-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100"
        >
          <IconUserCircle className="size-5" />
        </button>
      </div>
    </header>
  );
}

