export function toSafeInteger(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.trunc(value);
}

export function clampToNonNegativeInteger(value: number): number {
  return Math.max(0, toSafeInteger(value));
}

export function formatMilliseconds(value: number): string {
  const ms = clampToNonNegativeInteger(value);
  return `${ms}ms`;
}
