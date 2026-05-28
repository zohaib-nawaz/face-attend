import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const FACES_DIR = path.join(process.cwd(), "public", "Faces");
const OUTPUT_PATH = path.join(FACES_DIR, "knownFaces.json");

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function toTitleCaseLabel(fileName) {
  const baseName = fileName.replace(/\.[^.]+$/, "");
  const normalized = baseName.replace(/[_-]+/g, " ").trim();
  return normalized
    .split(/\s+/g)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function main() {
  const entries = await readdir(FACES_DIR, { withFileTypes: true });

  const faces = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name !== "knownFaces.json")
    .filter((name) => SUPPORTED_EXTENSIONS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const knownFaces = faces.map((fileName) => ({
    label: toTitleCaseLabel(fileName),
    fileName,
  }));

  await writeFile(OUTPUT_PATH, `${JSON.stringify(knownFaces, null, 2)}\n`, "utf8");
}

await main();

