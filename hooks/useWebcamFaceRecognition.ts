"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { faceRecognitionService } from "@/services/faceRecognitionService";
import type { FaceRecognitionMatch, FaceRecognitionState } from "@/types/faceRecognition";

type UseWebcamFaceRecognitionArgs = Readonly<{
  modelBaseUrl?: string;
  knownFacesUrl?: string;
  /**
   * Max acceptable face distance for a match.
   * Lower is stricter (fewer false positives, more false negatives).
   */
  matchThreshold?: number;
  /**
   * How often we run recognition while the camera is active.
   * Lower values mean more CPU usage.
   */
  detectionIntervalMs?: number;
}>;

type UseWebcamFaceRecognitionResult = Readonly<{
  state: FaceRecognitionState;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  overlayCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  start: () => Promise<void>;
  stop: () => void;
  stopRecognition: () => void;
  resumeRecognition: () => Promise<void>;
  isRecognitionActive: boolean;
  isCameraActive: boolean;
  lastMatch: FaceRecognitionMatch | null;
}>;

type RunningResources = Readonly<{
  stopStream: () => void;
  stopLoop: () => void;
}>;

function buildErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Something went wrong. Please try again.";
}

function stopMediaStream(stream: MediaStream): void {
  for (const track of stream.getTracks()) {
    track.stop();
  }
}

export function useWebcamFaceRecognition(
  args: UseWebcamFaceRecognitionArgs = {},
): UseWebcamFaceRecognitionResult {
  const {
    modelBaseUrl = "/models",
    knownFacesUrl = "/Faces/knownFaces.json",
    matchThreshold = 0.6,
    detectionIntervalMs = 450,
  } = args;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const warningMessageRef = useRef<string | null>(null);
  const faceMatcherRef = useRef<import("face-api.js").FaceMatcher | null>(null);
  const faceApiRef = useRef<(typeof import("face-api.js")) | null>(null);
  const lastEmittedMatchRef = useRef<FaceRecognitionMatch | null>(null);
  const lastStateEmitAtMsRef = useRef<number>(0);
  const isRecognitionActiveRef = useRef<boolean>(true);

  const [state, setState] = useState<FaceRecognitionState>({ status: "idle" });
  const [runningResources, setRunningResources] = useState<RunningResources | null>(null);
  const [lastMatch, setLastMatch] = useState<FaceRecognitionMatch | null>(null);

  const isCameraActive = runningResources !== null;
  const [isRecognitionActive, setIsRecognitionActive] = useState<boolean>(true);

  const stopRecognition = useCallback(() => {
    isRecognitionActiveRef.current = false;
    setIsRecognitionActive(false);
    setLastMatch(null);
    lastEmittedMatchRef.current = null;
    const overlayCanvas = overlayCanvasRef.current;
    if (overlayCanvas) {
      const context = overlayCanvas.getContext("2d");
      context?.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    }
    if (runningResources) {
      setState({
        status: "running",
        lastMatch: null,
        warningMessage: "Recognition paused. Camera is still running.",
      });
    }
  }, [runningResources]);

  const resumeRecognition = useCallback(async () => {
    isRecognitionActiveRef.current = true;
    setIsRecognitionActive(true);

    try {
      const matcher = await faceRecognitionService.buildFaceMatcher({
        modelBaseUrl,
        knownFacesUrl,
      });
      faceApiRef.current = matcher.faceApi;
      faceMatcherRef.current = matcher.faceMatcher;
      warningMessageRef.current = null;
      if (runningResources) {
        setState({ status: "running", lastMatch: null });
      }
    } catch (error) {
      const faceApi = await import("face-api.js");
      faceApiRef.current = faceApi;
      faceMatcherRef.current = null;
      warningMessageRef.current = buildErrorMessage(error);
      if (runningResources) {
        setState({
          status: "running",
          lastMatch: null,
          warningMessage: warningMessageRef.current,
        });
      }
    }
  }, [knownFacesUrl, modelBaseUrl, runningResources]);

  const stop = useCallback(() => {
    setRunningResources((resources) => {
      if (!resources) return null;
      resources.stopLoop();
      resources.stopStream();
      return null;
    });

    setLastMatch(null);
    warningMessageRef.current = null;
    faceMatcherRef.current = null;
    faceApiRef.current = null;
    lastEmittedMatchRef.current = null;
    lastStateEmitAtMsRef.current = 0;
    isRecognitionActiveRef.current = true;
    setIsRecognitionActive(true);
    setState({ status: "ready" });
  }, []);

  const start = useCallback(async () => {
    if (runningResources) return;

    try {
      setState({ status: "loading", message: "Loading recognition models…" });
      await faceRecognitionService.loadModels(modelBaseUrl);

      setState({ status: "loading", message: "Starting camera…" });
      const videoElement = videoRef.current;
      if (!videoElement) {
        setState({ status: "error", message: "Video element is not available." });
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      });

      videoElement.srcObject = stream;
      await videoElement.play();

      setState({ status: "running", lastMatch: null });
      isRecognitionActiveRef.current = true;
      setIsRecognitionActive(true);

      try {
        const matcher = await faceRecognitionService.buildFaceMatcher({
          modelBaseUrl,
          knownFacesUrl,
        });
        faceApiRef.current = matcher.faceApi;
        faceMatcherRef.current = matcher.faceMatcher;
        warningMessageRef.current = null;
      } catch (error) {
        const faceApi = await import("face-api.js");
        faceApiRef.current = faceApi;
        faceMatcherRef.current = null;
        warningMessageRef.current = buildErrorMessage(error);
        setState({
          status: "running",
          lastMatch: null,
          warningMessage: warningMessageRef.current,
        });
      }

      let timeoutId: number | null = null;
      let isLoopActive = true;
      let isDetectionRunning = false;

      const stopLoop = () => {
        isLoopActive = false;
        if (timeoutId !== null) {
          window.clearTimeout(timeoutId);
          timeoutId = null;
        }
      };

      const stopStream = () => {
        const srcObject = videoElement.srcObject;
        videoElement.pause();
        videoElement.srcObject = null;
        if (srcObject instanceof MediaStream) {
          stopMediaStream(srcObject);
        }
      };

      const overlayCanvas = overlayCanvasRef.current;
      if (overlayCanvas) {
        overlayCanvas.width = videoElement.videoWidth;
        overlayCanvas.height = videoElement.videoHeight;
      }

      const emitRunningState = (nextMatch: FaceRecognitionMatch | null) => {
        const nowMs = performance.now();
        const previous = lastEmittedMatchRef.current;

        const matchChanged =
          (previous?.label ?? null) !== (nextMatch?.label ?? null) ||
          (previous && nextMatch
            ? Math.abs(previous.distance - nextMatch.distance) >= 0.04
            : false);

        const isTimeToRefresh = nowMs - lastStateEmitAtMsRef.current >= 650;

        if (!matchChanged && !isTimeToRefresh) return;

        lastEmittedMatchRef.current = nextMatch;
        lastStateEmitAtMsRef.current = nowMs;
        setState({
          status: "running",
          lastMatch: nextMatch,
          warningMessage: warningMessageRef.current ?? undefined,
        });
      };

      const scheduleNext = () => {
        if (!isLoopActive) return;
        timeoutId = window.setTimeout(() => {
          void loopOnce();
        }, detectionIntervalMs);
      };

      const loopOnce = async () => {
        if (!isLoopActive) return;
        if (!isRecognitionActiveRef.current) {
          scheduleNext();
          return;
        }
        if (isDetectionRunning) {
          scheduleNext();
          return;
        }
        if (videoElement.readyState < 2) {
          scheduleNext();
          return;
        }

        const faceApi = faceApiRef.current;
        if (!faceApi) {
          scheduleNext();
          return;
        }

        isDetectionRunning = true;
        try {
          const detection = await faceApi
            .detectSingleFace(
              videoElement,
              new faceApi.TinyFaceDetectorOptions({
                inputSize: 416,
                scoreThreshold: 0.5,
              }),
            )
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!detection) {
            setLastMatch(null);
            emitRunningState(null);
            if (overlayCanvas) {
              const context = overlayCanvas.getContext("2d");
              context?.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
            }
            return;
          }

          const faceMatcher = faceMatcherRef.current;
          const best = faceMatcher
            ? faceRecognitionService.findBestMatch({
                faceApi,
                faceMatcher,
                descriptor: detection.descriptor,
              })
            : { label: "Unknown", distance: 1 };

          const effectiveMatch =
            best.label !== "Unknown" && best.distance <= matchThreshold
              ? best
              : { label: "Unknown", distance: best.distance };

          setLastMatch(effectiveMatch);
          emitRunningState(effectiveMatch);

          if (overlayCanvas) {
            const context = overlayCanvas.getContext("2d");
            if (context) {
              const videoWidth = videoElement.videoWidth;
              const videoHeight = videoElement.videoHeight;

              if (videoWidth <= 0 || videoHeight <= 0) {
                return;
              }

              overlayCanvas.width = videoWidth;
              overlayCanvas.height = videoHeight;

              context.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

              const resized = faceApi.resizeResults(detection, {
                width: overlayCanvas.width,
                height: overlayCanvas.height,
              });

              const box = resized.detection.box;
              context.strokeStyle =
                effectiveMatch.label === "Unknown" ? "#fb7185" : "#34d399";
              context.lineWidth = 3;
              context.strokeRect(box.x, box.y, box.width, box.height);

              context.font =
                "16px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
              context.fillStyle = "rgba(0,0,0,0.65)";
              const label = `${effectiveMatch.label} (${effectiveMatch.distance.toFixed(2)})`;
              const paddingX = 10;
              const paddingY = 6;
              const textMetrics = context.measureText(label);
              const textWidth = textMetrics.width;
              const textHeight = 18;
              const rectX = Math.max(0, box.x);
              const rectY = Math.max(
                0,
                box.y - (textHeight + paddingY * 2 + 6),
              );
              context.fillRect(
                rectX,
                rectY,
                textWidth + paddingX * 2,
                textHeight + paddingY * 2,
              );
              context.fillStyle = "#ffffff";
              context.fillText(
                label,
                rectX + paddingX,
                rectY + textHeight + paddingY - 2,
              );
            }
          }
        } finally {
          isDetectionRunning = false;
          scheduleNext();
        }
      };

      void loopOnce();

      setRunningResources({ stopStream, stopLoop });
    } catch (error) {
      setRunningResources(null);
      setLastMatch(null);
      warningMessageRef.current = null;
      faceMatcherRef.current = null;
      faceApiRef.current = null;
      lastEmittedMatchRef.current = null;
      lastStateEmitAtMsRef.current = 0;
      setState({ status: "error", message: buildErrorMessage(error) });
    }
  }, [
    detectionIntervalMs,
    knownFacesUrl,
    matchThreshold,
    modelBaseUrl,
    runningResources,
  ]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return useMemo(
    () => ({
      state,
      videoRef,
      overlayCanvasRef,
      start,
      stop,
      stopRecognition,
      resumeRecognition,
      isRecognitionActive,
      isCameraActive,
      lastMatch,
    }),
    [
      isCameraActive,
      isRecognitionActive,
      lastMatch,
      resumeRecognition,
      start,
      state,
      stop,
      stopRecognition,
    ],
  );
}

