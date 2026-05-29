export type NavItemId =
  | "dashboard"
  | "live-monitor"
  | "live-attendance"
  | "attendance-logs"
  | "student-directory"
  | "analytics"
  | "system-config";

export type AttendanceStatus = "on-time" | "tardy";

export type RecentCapture = Readonly<{
  id: string;
  fullName: string;
  studentId: string;
  status: AttendanceStatus;
  capturedAtIso: string;
  avatarUrl: string;
}>;

export type LiveFeed = Readonly<{
  locationLabel: string;
  streamLabel: string;
  streamStatus: "active" | "offline";
  cameraImageUrl: string;
  lastSeenIso: string;
}>;

export type DashboardStats = Readonly<{
  totalChecked: number;
  remaining: number;
  exceptions: number;
}>;

export type DashboardData = Readonly<{
  liveFeed: LiveFeed;
  recentCaptures: ReadonlyArray<RecentCapture>;
  stats: DashboardStats;
  uptimeLabel: string;
  latencyMs: number;
}>;
