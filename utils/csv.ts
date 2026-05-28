export function toCsv(
  rows: ReadonlyArray<Readonly<Record<string, string | number | boolean | null | undefined>>>,
  columns: ReadonlyArray<string>
): string {
  const header = columns.map(escapeCsvValue).join(",");
  const lines = rows.map((row) =>
    columns
      .map((key) => escapeCsvValue(row[key]))
      .join(",")
  );

  return [header, ...lines].join("\r\n");
}

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  const raw = String(value);
  if (raw.includes('"') || raw.includes(",") || raw.includes("\n") || raw.includes("\r")) {
    return `"${raw.replaceAll('"', '""')}"`;
  }
  return raw;
}

