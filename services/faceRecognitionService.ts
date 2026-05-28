import type {
  FaceRecognitionMatch,
  KnownFaceDefinition,
} from "@/types/faceRecognition";

type FaceApi = typeof import("face-api.js");

type FaceRecognitionService = Readonly<{
  loadModels: (modelBaseUrl: string) => Promise<void>;
  loadKnownFaces: (knownFacesUrl: string) => Promise<KnownFaceDefinition[]>;
  buildFaceMatcher: (args: Readonly<{
    modelBaseUrl: string;
    knownFacesUrl: string;
  }>) => Promise<Readonly<{ faceApi: FaceApi; faceMatcher: import("face-api.js").FaceMatcher }>>;
  findBestMatch: (args: Readonly<{
    faceApi: FaceApi;
    faceMatcher: import("face-api.js").FaceMatcher;
    descriptor: Float32Array;
  }>) => FaceRecognitionMatch;
}>;

let modelsLoaded = false;

async function importFaceApi(): Promise<FaceApi> {
  const faceApi = await import("face-api.js");
  return faceApi;
}

function buildModelUrl(modelBaseUrl: string, fileName: string): string {
  const base = modelBaseUrl.endsWith("/") ? modelBaseUrl.slice(0, -1) : modelBaseUrl;
  return `${base}/${fileName}`;
}

async function assertOkJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}

async function assertAssetExists(assetUrl: string): Promise<void> {
  const response = await fetch(assetUrl, { method: "GET" });
  if (!response.ok) {
    throw new Error(
      `Missing face image at "${assetUrl}". Put the file in "public${assetUrl}" (case-sensitive) and update "public/Faces/knownFaces.json".`,
    );
  }
}

export const faceRecognitionService: FaceRecognitionService = {
  async loadModels(modelBaseUrl) {
    if (modelsLoaded) return;

    const faceApi = await importFaceApi();

    /**
     * We use the tiny detector to keep CPU usage reasonable for a prototype.
     * Models must exist under `/public/models`.
     */
    await Promise.all([
      faceApi.nets.tinyFaceDetector.loadFromUri(modelBaseUrl),
      faceApi.nets.faceLandmark68Net.loadFromUri(modelBaseUrl),
      faceApi.nets.faceRecognitionNet.loadFromUri(modelBaseUrl),
    ]);

    modelsLoaded = true;
  },

  async loadKnownFaces(knownFacesUrl) {
    const response = await fetch(knownFacesUrl, { method: "GET" });
    const faces = await assertOkJson<KnownFaceDefinition[]>(response);

    const normalizedFaces = faces.map((face) => ({
      label: face.label.trim(),
      fileName: face.fileName.trim(),
    }));

    const invalid = normalizedFaces.find((face) => !face.label || !face.fileName);
    if (invalid) {
      throw new Error("Known faces list contains an empty label or fileName.");
    }

    return normalizedFaces;
  },

  async buildFaceMatcher({ modelBaseUrl, knownFacesUrl }) {
    const faceApi = await importFaceApi();
    await this.loadModels(modelBaseUrl);

    const knownFaces = await this.loadKnownFaces(knownFacesUrl);
    if (knownFaces.length === 0) {
      throw new Error(
        'No known faces configured. Add entries to "public/Faces/knownFaces.json" and put the referenced images in "public/Faces".',
      );
    }

    const labeledDescriptors = await Promise.all(
      knownFaces.map(async (knownFace) => {
        const imageUrl = buildModelUrl("/Faces", knownFace.fileName);
        await assertAssetExists(imageUrl);
        const image = await faceApi.fetchImage(imageUrl);
        const detection = await faceApi
          .detectSingleFace(image, new faceApi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptor();

        if (!detection) {
          throw new Error(
            `No face detected in known face image "${knownFace.fileName}". Use a clear, front-facing photo.`,
          );
        }

        return new faceApi.LabeledFaceDescriptors(knownFace.label, [
          detection.descriptor,
        ]);
      }),
    );

    const faceMatcher = new faceApi.FaceMatcher(labeledDescriptors);
    return { faceApi, faceMatcher };
  },

  findBestMatch({ faceApi, faceMatcher, descriptor }) {
    const best = faceMatcher.findBestMatch(descriptor);

    return {
      label: best.label === "unknown" ? "Unknown" : best.label,
      distance: best.distance,
    };
  },
};

