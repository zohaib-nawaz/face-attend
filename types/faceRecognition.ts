export type KnownFaceDefinition = Readonly<{
  /**
   * Display label for the matched face (e.g., "Ali", "Ahmed").
   * This should match how you want names shown in the UI.
   */
  label: string;
  /**
   * File name under `/public/Faces/` (e.g., "ali.jpg").
   */
  fileName: string;
}>;

export type FaceRecognitionMatch = Readonly<{
  label: string;
  /**
   * Euclidean distance between the input face descriptor and the best known face.
   * Lower is better. Common thresholds range ~0.45–0.65 depending on quality.
   */
  distance: number;
}>;

export type FaceRecognitionState =
  | Readonly<{ status: "idle" }>
  | Readonly<{ status: "loading"; message: string }>
  | Readonly<{ status: "ready" }>
  | Readonly<{
      status: "running";
      lastMatch: FaceRecognitionMatch | null;
      warningMessage?: string;
    }>
  | Readonly<{ status: "error"; message: string }>;

