import type { DashboardData } from "@/types/dashboard";

type DashboardService = Readonly<{
  getDashboardData: () => Promise<DashboardData>;
}>;

function buildMockDashboardData(nowIso: string): DashboardData {
  return {
    liveFeed: {
      locationLabel: "Live Feed - Hallway A",
      streamLabel: "Active Recording • 1080p Stream",
      streamStatus: "active",
      cameraImageUrl:
        "https://images.unsplash.com/photo-1522994897842-80bf59c11346?auto=format&fit=crop&w=1400&q=80",
      lastSeenIso: nowIso,
    },
    recentCaptures: [
      {
        id: "cap_1",
        fullName: "Elena Rossi",
        studentId: "#STU-88219",
        status: "on-time",
        capturedAtIso: nowIso,
        avatarUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&w=96&h=96&q=80",
      },
      {
        id: "cap_2",
        fullName: "David Chen",
        studentId: "#STU-77312",
        status: "on-time",
        capturedAtIso: new Date(Date.now() - 3 * 60_000).toISOString(),
        avatarUrl:
          "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?auto=format&fit=facearea&w=96&h=96&q=80",
      },
      {
        id: "cap_3",
        fullName: "Sarah Jenkins",
        studentId: "#STU-11204",
        status: "tardy",
        capturedAtIso: new Date(Date.now() - 7 * 60_000).toISOString(),
        avatarUrl:
          "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=facearea&w=96&h=96&q=80",
      },
      {
        id: "cap_4",
        fullName: "Maya Patel",
        studentId: "#STU-55210",
        status: "on-time",
        capturedAtIso: new Date(Date.now() - 10 * 60_000).toISOString(),
        avatarUrl:
          "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=96&h=96&q=80",
      },
      {
        id: "cap_5",
        fullName: "Lucas Kim",
        studentId: "#STU-66103",
        status: "on-time",
        capturedAtIso: new Date(Date.now() - 14 * 60_000).toISOString(),
        avatarUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=96&h=96&q=80",
      },
    ],
    stats: {
      totalChecked: 412,
      remaining: 124,
      exceptions: 5,
    },
    uptimeLabel: "Uptime: 04:12:33",
    latencyMs: 24,
  };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const dashboardService: DashboardService = {
  async getDashboardData() {
    await sleep(450);
    return buildMockDashboardData(new Date().toISOString());
  },
};

