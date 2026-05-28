export type TimeZoneId = string;

const DEFAULT_TIME_ZONE: TimeZoneId = "UTC";

export function formatDateTimeLabel(
  isoString: string,
  options?: Readonly<{
    timeZone?: TimeZoneId;
    includeSeconds?: boolean;
  }>
): string {
  const parsedDate = new Date(isoString);
  if (Number.isNaN(parsedDate.getTime())) return "Invalid date";

  const timeZone = options?.timeZone ?? DEFAULT_TIME_ZONE;
  const includeSeconds = options?.includeSeconds ?? false;

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: includeSeconds ? "2-digit" : undefined,
    hour12: true,
  });

  return formatter.format(parsedDate);
}

export function formatTimeLabel(
  isoString: string,
  options?: Readonly<{
    timeZone?: TimeZoneId;
  }>
): string {
  const parsedDate = new Date(isoString);
  if (Number.isNaN(parsedDate.getTime())) return "--:--";

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: options?.timeZone ?? DEFAULT_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formatter.format(parsedDate);
}
