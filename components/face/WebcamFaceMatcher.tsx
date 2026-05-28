"use client";

import { Button } from "@/components/ui/Button";
import { useFaceRecognitionSession } from "@/components/face/FaceRecognitionProvider";

type WebcamFaceMatcherProps = Readonly<{
  className?: string;
}>;

export function WebcamFaceMatcher({ className }: WebcamFaceMatcherProps) {
  const recognition = useFaceRecognitionSession();

  const isStartDisabled = recognition.state.status === "loading";
  const controlButtonClassName =
    "whitespace-nowrap border border-slate-200 bg-white/95 text-slate-900 hover:bg-white disabled:opacity-60 disabled:bg-white/70 disabled:text-slate-900 disabled:hover:bg-white/70";

  const warningMessage =
    recognition.state.status === "running"
      ? recognition.state.warningMessage
      : undefined;

  const statusLabel =
    recognition.state.status === "loading"
      ? recognition.state.message
      : recognition.state.status === "error"
        ? recognition.state.message
        : recognition.lastMatch?.label
          ? `Detected: ${recognition.lastMatch.label}`
          : recognition.isCameraActive
            ? "No face detected"
            : "Camera is stopped";

  const statusToneClassName =
    recognition.state.status === "error"
      ? "text-rose-700"
      : recognition.lastMatch?.label === "Unknown"
        ? "text-rose-700"
        : recognition.lastMatch?.label
          ? "text-emerald-700"
          : "text-slate-700";

  return (
    <div className={className}>
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-slate-950">
        <video
          ref={recognition.videoRef}
          className="h-full w-full object-cover"
          playsInline
          muted
        />
        <canvas
          ref={recognition.overlayCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        <div className="absolute left-4 top-4 right-16 z-50 flex flex-wrap items-center gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {recognition.isCameraActive ? (
              <>
                {recognition.isRecognitionActive ? (
                  <Button
                    variant="secondary"
                    className={controlButtonClassName}
                    onClick={recognition.stopRecognition}
                  >
                    Stop recognition
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    className={controlButtonClassName}
                    onClick={() => void recognition.resumeRecognition()}
                  >
                    Resume recognition
                  </Button>
                )}

                <Button
                  variant="secondary"
                  className={controlButtonClassName}
                  onClick={recognition.stop}
                >
                  Stop camera
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                className={controlButtonClassName}
                onClick={() => void recognition.start()}
                disabled={isStartDisabled}
              >
                Start camera
              </Button>
            )}
          </div>

          <div className="ml-auto rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold backdrop-blur">
            <span className={statusToneClassName}>{statusLabel}</span>
          </div>
        </div>

        {recognition.state.status === "error" ? (
          <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-rose-200 bg-white/95 p-4 text-sm text-rose-800 backdrop-blur">
            {recognition.state.message}
          </div>
        ) : null}

        {warningMessage ? (
          <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-amber-200 bg-white/95 p-4 text-sm text-amber-900 backdrop-blur">
            {warningMessage}
          </div>
        ) : null}

        {!recognition.isCameraActive && recognition.state.status !== "loading" ? (
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div className="max-w-md rounded-xl bg-white/95 p-5 text-sm text-slate-700 backdrop-blur">
              <div className="text-base font-semibold text-slate-900">
                Start a live session
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Turn on the camera to begin detection.
              </p>

              <div className="mt-4">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => void recognition.start()}
                  disabled={isStartDisabled}
                >
                  Start camera
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

