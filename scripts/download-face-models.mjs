import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MODELS_DIR = path.join(process.cwd(), "public", "models");
const WEIGHTS_BASE_URL =
  "https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights";

const REQUIRED_MANIFESTS = [
  "tiny_face_detector_model-weights_manifest.json",
  "face_landmark_68_model-weights_manifest.json",
  "face_recognition_model-weights_manifest.json",
];

function assertString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Expected ${label} to be a non-empty string.`);
  }
}

async function downloadText(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url} (HTTP ${response.status})`);
  }
  return await response.text();
}

async function downloadBinary(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url} (HTTP ${response.status})`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

async function downloadManifestAndShards(manifestFileName) {
  assertString(manifestFileName, "manifestFileName");

  const manifestUrl = `${WEIGHTS_BASE_URL}/${manifestFileName}`;
  const manifestText = await downloadText(manifestUrl);
  const manifestPath = path.join(MODELS_DIR, manifestFileName);

  await writeFile(manifestPath, manifestText, "utf8");

  /** @type {{ paths: string[] }[]} */
  const manifestJson = JSON.parse(manifestText);
  const shardFileNames = new Set();

  for (const group of manifestJson) {
    if (!group || !Array.isArray(group.paths)) continue;
    for (const shardFileName of group.paths) {
      if (typeof shardFileName === "string" && shardFileName.trim().length > 0) {
        shardFileNames.add(shardFileName);
      }
    }
  }

  for (const shardFileName of shardFileNames) {
    const shardUrl = `${WEIGHTS_BASE_URL}/${shardFileName}`;
    const shardBytes = await downloadBinary(shardUrl);
    const shardPath = path.join(MODELS_DIR, shardFileName);
    await writeFile(shardPath, shardBytes);
  }
}

async function main() {
  await ensureDir(MODELS_DIR);

  for (const manifest of REQUIRED_MANIFESTS) {
    await downloadManifestAndShards(manifest);
  }
}

await main();

