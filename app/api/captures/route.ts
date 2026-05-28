import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

type SaveCaptureRequest = Readonly<{
  label: string;
  imageDataUrl: string;
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

  return Response.json({ ok: true, fileName, publicPath: `/captures/${fileName}` });
}

