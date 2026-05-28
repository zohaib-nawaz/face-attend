"use client";

import { useEffect, useRef, useState } from "react";
import type { LiveFeed } from "@/types/dashboard";
import { formatDateTimeLabel } from "@/utils/dateTime";
import { WebcamFaceMatcher } from "@/components/face/WebcamFaceMatcher";
import { useFaceRecognitionSession } from "@/components/face/FaceRecognitionProvider";
import { useFaceVerification } from "@/hooks/useFaceVerification";

function CameraOverlayButton({
  label,
  children,
}: Readonly<{ label: string; children: React.ReactNode }>) {
  return (
    <button
      type="button"
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-xl bg-black/70 text-white backdrop-blur hover:bg-black/80"
    >
      {children}
    </button>
  );
}

function IconCamera() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d="M4 8h3l1.5-2h7L17 8h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function IconSquareFocus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
      <path
        d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M9 9h6v6H9z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LiveFeedCard({
  liveFeed,
  timeZone,
  onAttendanceCapture,
}: Readonly<{
  liveFeed: LiveFeed;
  timeZone: string;
  onAttendanceCapture?: (capture: {
    id: string;
    label: string;
    capturedAtIso: string | null;
    photoUrl: string;
  }) => void;
}>) {
  const recognition = useFaceRecognitionSession();
  const verification = useFaceVerification(recognition.lastMatch, {
    requiredSamples: 10,
    sampleWindowMs: 12_000,
    maxDistance: 0.6,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const previousVerifiedLabelsRef = useRef<Set<string>>(new Set());
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const previous = previousVerifiedLabelsRef.current;
    const currentVerified = verification.entries
      .filter((entry) => entry.isVerified)
      .map((entry) => entry.label);
    const next = new Set(currentVerified);
    previousVerifiedLabelsRef.current = next;

    const newlyVerifiedLabel = currentVerified.find((label) => !previous.has(label));
    if (!newlyVerifiedLabel) return;

    if (toastTimeoutRef.current !== null) {
      window.clearTimeout(toastTimeoutRef.current);
    }

    setToastMessage(`${newlyVerifiedLabel} verified`);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 1000);

    void captureAndSaveFrameWhenVisible(newlyVerifiedLabel);

    return () => {
      if (toastTimeoutRef.current !== null) {
        window.clearTimeout(toastTimeoutRef.current);
        toastTimeoutRef.current = null;
      }
    };
  }, [verification.entries]);

  const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

  const captureAndSaveFrameWhenVisible = async (label: string) => {
    // Wait briefly for a clean frame where the verified face is actually detected.
    // This prevents saving random frames right as verification flips.
    const maxAttempts = 6; // ~1.0s total (6 * 160ms)
    const delayMs = 160;
    const requiredDistance = 0.6;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
      if (!isMountedRef.current) return;

      const match = recognition.lastMatch;
      const video = recognition.videoRef.current;
      const ok =
        recognition.isCameraActive &&
        !!video &&
        !!video.videoWidth &&
        !!video.videoHeight &&
        !!match &&
        match.label === label &&
        match.distance <= requiredDistance;

      if (!ok) {
        await wait(delayMs);
        continue;
      }

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL("image/png");
      const res = await fetch("/api/captures", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, imageDataUrl }),
      });
      let payload: unknown = null;
      try {
        payload = (await res.json()) as unknown;
      } catch {
        payload = null;
      }

      const data = payload as
        | {
            ok?: boolean;
            fileName?: string;
            publicPath?: string;
            capturedAtIso?: string;
            label?: string;
          }
        | null;

      if (data?.ok && data.fileName && data.publicPath) {
        onAttendanceCapture?.({
          id: data.fileName,
          label: data.label ?? label,
          capturedAtIso: data.capturedAtIso ?? null,
          photoUrl: data.publicPath,
        });
      }
      return;
    }
  };

  const statusDotClassName =
    liveFeed.streamStatus === "active" ? "bg-rose-500" : "bg-slate-400";

  return (
    <section className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 lg:h-full lg:min-h-0">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">
            {liveFeed.locationLabel}
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-600">
            <span
              className={[
                "inline-block size-2 rounded-full",
                statusDotClassName,
              ].join(" ")}
            />
            <span>{liveFeed.streamLabel}</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
          <span className="inline-flex size-5 items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5 text-slate-600">
              <path
                d="M8 3v2M16 3v2M4 8h16M6 21h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span>{formatDateTimeLabel(liveFeed.lastSeenIso, { timeZone })}</span>
        </div>
      </div>

      <div className="mt-5 lg:flex lg:min-h-0 lg:flex-1">
        <div className="relative w-full overflow-hidden rounded-xl bg-slate-100 aspect-video min-h-[260px] sm:min-h-[340px] lg:aspect-auto lg:min-h-0">
          <WebcamFaceMatcher className="absolute inset-0" />

          <div className="absolute right-3 top-3 flex flex-col gap-2">
            <CameraOverlayButton label="Focus">
              <IconSquareFocus />
            </CameraOverlayButton>
            <CameraOverlayButton label="Capture">
              <IconCamera />
            </CameraOverlayButton>
          </div>

          <div
            className={[
              "pointer-events-none absolute bottom-4 left-4 z-40 rounded-xl border border-white/15 bg-black/55 px-4 py-3 text-sm font-semibold text-white shadow-lg backdrop-blur transition-all duration-150",
              toastMessage ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            ].join(" ")}
            aria-live="polite"
          >
            {toastMessage ?? " "}
          </div>
        </div>
      </div>
    </section>
  );
}

