"use client";

import { createContext, useContext } from "react";
import { useWebcamFaceRecognition } from "@/hooks/useWebcamFaceRecognition";

type FaceRecognitionSession = ReturnType<typeof useWebcamFaceRecognition>;

const FaceRecognitionContext = createContext<FaceRecognitionSession | null>(null);

export function FaceRecognitionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = useWebcamFaceRecognition();
  return (
    <FaceRecognitionContext.Provider value={session}>
      {children}
    </FaceRecognitionContext.Provider>
  );
}

export function useFaceRecognitionSession(): FaceRecognitionSession {
  const session = useContext(FaceRecognitionContext);
  if (!session) {
    throw new Error(
      "`useFaceRecognitionSession` must be used within `FaceRecognitionProvider`.",
    );
  }
  return session;
}

