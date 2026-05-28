import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type SaveCaptureRequest = Readonly<{
  label: string;
  imageDataUrl: string;
}>;

type CaptureListItem = Readonly<{
  fileName: string;
  publicPath: string;
  label: string;
  capturedAtIso: string | null;
}>;

function sanitizeFileSegment(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-+|-+$/g, "")
    .slice(0, 60) || "unknown";
}

function extractBase64Png(dataUrl: string): string | null {
  const prefix = "data:image/png;base64,";
  if (!dataUrl.startsWith(prefix)) return null;
  return dataUrl.slice(prefix.length);
}

function parseCaptureFileName(fileName: string): { capturedAtIso: string | null; label: string } {
  const match = /^(\d{4}-\d{2}-\d{2}T\d{2})-(\d{2})-(\d{2})-(\d{3})Z-(.+)\.png$/i.exec(
    fileName,
  );
  if (!match) return { capturedAtIso: null, label: "Unknown" };

  const [, dateHour, minute, second, ms, labelPart] = match;
  const isoCandidate = `${dateHour}:${minute}:${second}.${ms}Z`;
  const parsed = new Date(isoCandidate);

  return {
    capturedAtIso: Number.isNaN(parsed.getTime()) ? null : parsed.toISOString(),
    label: labelPart.replaceAll("-", " ").trim() || "Unknown",
  };
}

export async function GET() {
  const capturesDir = path.join(process.cwd(), "public", "captures");
  let files: string[] = [];
  try {
    files = await readdir(capturesDir);
  } catch {
    return Response.json({ ok: true, captures: [] satisfies CaptureListItem[] });
  }

  const items = await Promise.all(
    files
      .filter((file) => file.toLowerCase().endsWith(".png"))
      .map(async (fileName): Promise<CaptureListItem | null> => {
        const fullPath = path.join(capturesDir, fileName);
        let mtimeMs = 0;
        try {
          const s = await stat(fullPath);
          mtimeMs = s.mtimeMs;
        } catch {
          mtimeMs = 0;
        }

        const parsed = parseCaptureFileName(fileName);
        const capturedAtIso = parsed.capturedAtIso ?? (mtimeMs ? new Date(mtimeMs).toISOString() : null);
        return {
          fileName,
          publicPath: `/captures/${fileName}`,
          label: parsed.label,
          capturedAtIso,
        };
      }),
  );

  const captures = items
    .filter((item): item is CaptureListItem => item !== null)
    .sort((a, b) => (b.capturedAtIso ?? "").localeCompare(a.capturedAtIso ?? ""))
    .slice(0, 50);

  return Response.json({ ok: true, captures });
}

export async function POST(request: Request) {
  let body: SaveCaptureRequest | null = null;
  try {
    body = (await request.json()) as SaveCaptureRequest;
  } catch {
    body = null;
  }

  if (!body?.label || !body?.imageDataUrl) {
    return Response.json({ ok: false, error: "Missing label or imageDataUrl" }, { status: 400 });
  }

  const base64 = extractBase64Png(body.imageDataUrl);
  if (!base64) {
    return Response.json({ ok: false, error: "Only PNG data URLs are supported" }, { status: 400 });
  }

  const buffer = Buffer.from(base64, "base64");
  const now = new Date();
  const datePrefix = now.toISOString().replaceAll(/[:.]/g, "-");
  const fileName = `${datePrefix}-${sanitizeFileSegment(body.label)}.png`;

  const publicDir = path.join(process.cwd(), "public");
  const capturesDir = path.join(publicDir, "captures");
  await mkdir(capturesDir, { recursive: true });
  const filePath = path.join(capturesDir, fileName);
  await writeFile(filePath, buffer);

  return Response.json({
    ok: true,
    fileName,
    publicPath: `/captures/${fileName}`,
    capturedAtIso: now.toISOString(),
    label: body.label,
  });
}

