"use client";

import { useMemo, useState } from "react";
import type { NavItemId } from "@/types/dashboard";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

export function DashboardShell({
  activeItemId,
  children,
  footer,
}: Readonly<{
  activeItemId: NavItemId;
  children: React.ReactNode;
  footer?: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const topBarProps = useMemo(
    () => ({
      onMenuClick: () => setIsSidebarOpen(true),
    }),
    [],
  );

  return (
    <div className="min-h-dvh bg-slate-50 overflow-hidden">
      <TopBar {...topBarProps} />
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden supports-[height:100dvh]:h-[calc(100dvh-4rem)]">
        <Sidebar
          activeItemId={activeItemId}
          className="hidden h-full self-stretch lg:flex"
        />

        {isSidebarOpen ? (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              className="absolute inset-0 bg-slate-950/40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-[280px] bg-white shadow-xl">
              <Sidebar activeItemId={activeItemId} className="h-full border-r-0" />
            </div>
          </div>
        ) : null}

        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
          {footer ?? null}
        </div>
      </div>
    </div>
  );
}

