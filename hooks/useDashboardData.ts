"use client";

import { useEffect, useMemo, useState } from "react";
import { dashboardService } from "@/services/dashboardService";
import type { DashboardData } from "@/types/dashboard";

type LoadState =
  | Readonly<{ status: "loading" }>
  | Readonly<{ status: "error"; message: string }>
  | Readonly<{ status: "success"; data: DashboardData }>;

export function useDashboardData(): LoadState {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let isActive = true;

    async function load(): Promise<void> {
      try {
        const data = await dashboardService.getDashboardData();
        if (!isActive) return;
        setState({ status: "success", data });
      } catch {
        if (!isActive) return;
        setState({
          status: "error",
          message: "We couldn’t load the dashboard right now. Please try again.",
        });
      }
    }

    void load();
    return () => {
      isActive = false;
    };
  }, []);

  return useMemo(() => state, [state]);
}

