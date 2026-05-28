"use client";

/* eslint-disable react-hooks/refs, react-hooks/set-state-in-effect */

import { useEffect, useMemo, useRef, useState } from "react";
import type { FaceRecognitionMatch } from "@/types/faceRecognition";

export type RecognizedFaceLogEntry = Readonly<{
  label: string;
  lastSeenIso: string;
  verifiedAtIso: string;
}>;

function toSortedArray(map: Map<string, RecognizedFaceLogEntry>): RecognizedFaceLogEntry[] {
  return Array.from(map.values()).sort((a, b) => b.lastSeenIso.localeCompare(a.lastSeenIso));
}

export function useRecognizedFacesLog(args: Readonly<{
  lastMatch: FaceRecognitionMatch | null;
  isVerifiedLabel: (label: string) => boolean;
}>) {
  const logRef = useRef<Map<string, RecognizedFaceLogEntry>>(new Map());
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const { lastMatch, isVerifiedLabel } = args;
    if (!lastMatch) return;
    if (lastMatch.label === "Unknown") return;
    if (!isVerifiedLabel(lastMatch.label)) return;

    const nowIso = new Date().toISOString();
    const previous = logRef.current.get(lastMatch.label);

    logRef.current.set(lastMatch.label, {
      label: lastMatch.label,
      lastSeenIso: nowIso,
      verifiedAtIso: previous?.verifiedAtIso ?? nowIso,
    });
    setVersion((current) => current + 1);
  }, [args.isVerifiedLabel, args.lastMatch]);

  return useMemo(() => {
    void version;
    return toSortedArray(logRef.current);
  }, [version]);
}

