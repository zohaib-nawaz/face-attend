import type { NavItemId } from "@/types/dashboard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import type { ReactNode } from "react";
import {
  IconChartBar,
  IconClipboardList,
  IconCog,
  IconGraduationCap,
  IconLayoutDashboard,
  IconLogout,
  IconPlus,
  IconSupport,
  IconUsers,
  IconVideo,
} from "@/components/ui/Icon";

type NavItem = Readonly<{
  id: NavItemId;
  label: string;
  icon: ReactNode;
  href: string;
}>;

const navItems: ReadonlyArray<NavItem> = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <IconLayoutDashboard className="size-5" />,
    href: "/dashboard",
  },
  {
    id: "live-monitor",
    label: "Live Monitor",
    icon: <IconVideo className="size-5" />,
    href: "/live-monitor",
  },
  {
    id: "live-attendance",
    label: "Live Attendance",
    icon: <IconClipboardList className="size-5" />,
    href: "/live-attendance",
  },
  {
    id: "attendance-logs",
    label: "Attendance Logs",
    icon: <IconClipboardList className="size-5" />,
    href: "/attendance-logs",
  },
  {
    id: "student-directory",
    label: "Student Directory",
    icon: <IconUsers className="size-5" />,
    href: "/student-directory",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <IconChartBar className="size-5" />,
    href: "/analytics",
  },
  {
    id: "system-config",
    label: "System Config",
    icon: <IconCog className="size-5" />,
    href: "/system-config",
  },
];

export function Sidebar({
  activeItemId,
  className,
}: Readonly<{ activeItemId: NavItemId; className?: string }>) {
  return (
    <aside
      className={[
        "flex h-full w-[280px] shrink-0 flex-col border-r border-slate-200 bg-white",
        className ?? "",
      ].join(" ")}
    >
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="inline-flex size-11 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          <IconGraduationCap className="size-6" />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-slate-900">Admin Portal</div>
          <div className="text-xs text-slate-500">Security Station 01</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.id === activeItemId;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")}
                >
                  {isActive ? (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r bg-slate-900" />
                  ) : null}
                  <span
                    className={[
                      "inline-flex items-center justify-center",
                      isActive ? "text-slate-900" : "text-slate-500",
                    ].join(" ")}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-slate-200 px-6 py-5">
        <Button
          variant="primary"
          className="w-full justify-center"
          leftIcon={<IconPlus className="size-4" />}
        >
          Manual Entry
        </Button>
        <div className="mt-4 space-y-1">
          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <IconSupport className="size-5 text-slate-500" />
            <span>Support</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            <IconLogout className="size-5 text-slate-500" />
            <span>Logout</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

