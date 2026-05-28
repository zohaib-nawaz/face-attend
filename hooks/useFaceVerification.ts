"use client";

/* eslint-disable react-hooks/refs, react-hooks/set-state-in-effect */

import { useEffect, useMemo, useRef, useState } from "react";
import type { FaceRecognitionMatch } from "@/types/faceRecognition";

export type FaceVerificationEntry = Readonly<{
  label: string;
  lastSeenIso: string;
  lastDistance: number;
  samplesCollected: number;
  requiredSamples: number;
  isVerified: boolean;
}>;

export type FaceVerificationConfig = Readonly<{
  requiredSamples: number;
  sampleWindowMs: number;
  maxDistance: number;
}>;

type InternalEntry = {
  label: string;
  lastSeenIso: string;
  lastDistance: number;
  requiredSamples: number;
  isVerified: boolean;
  sampleTimestampsMs: number[];
};

function toSortedEntries(map: Map<string, InternalEntry>): FaceVerificationEntry[] {
  return Array.from(map.values())
    .map(
      (entry): FaceVerificationEntry => ({
        label: entry.label,
        lastSeenIso: entry.lastSeenIso,
        lastDistance: entry.lastDistance,
        samplesCollected: Math.min(entry.sampleTimestampsMs.length, entry.requiredSamples),
        requiredSamples: entry.requiredSamples,
        isVerified: entry.isVerified,
      }),
    )
    .sort((a, b) => b.lastSeenIso.localeCompare(a.lastSeenIso));
}

export function useFaceVerification(
  lastMatch: FaceRecognitionMatch | null,
  config: FaceVerificationConfig,
) {
  const stateRef = useRef<Map<string, InternalEntry>>(new Map());
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!lastMatch) return;
    if (lastMatch.label === "Unknown") return;

    const now = Date.now();
    const nowIso = new Date(now).toISOString();

    const previous = stateRef.current.get(lastMatch.label);
    const requiredSamples = Math.max(1, config.requiredSamples);

    const next: InternalEntry = previous
      ? {
          ...previous,
          lastSeenIso: nowIso,
          lastDistance: lastMatch.distance,
          requiredSamples,
        }
      : {
          label: lastMatch.label,
          lastSeenIso: nowIso,
          lastDistance: lastMatch.distance,
          requiredSamples,
          isVerified: false,
          sampleTimestampsMs: [],
        };

    // Stop collecting samples once verified.
    if (!next.isVerified) {
      // Only count samples that meet the distance requirement.
      if (lastMatch.distance <= config.maxDistance) {
        next.sampleTimestampsMs = [...next.sampleTimestampsMs, now];
      }

      const cutoff = now - config.sampleWindowMs;
      next.sampleTimestampsMs = next.sampleTimestampsMs.filter((ts) => ts >= cutoff);

      if (next.sampleTimestampsMs.length >= requiredSamples) {
        next.isVerified = true;
        // Cap stored samples so UI doesn't show > requiredSamples.
        next.sampleTimestampsMs = next.sampleTimestampsMs.slice(-requiredSamples);
      }
    }

    stateRef.current.set(lastMatch.label, next);
    setVersion((current) => current + 1);
  }, [config.maxDistance, config.requiredSamples, config.sampleWindowMs, lastMatch]);

  return useMemo(() => {
    void version;
    const entries = toSortedEntries(stateRef.current);
    const isVerifiedLabel = (label: string) => stateRef.current.get(label)?.isVerified ?? false;
    return { entries, isVerifiedLabel } as const;
  }, [version]);
}

