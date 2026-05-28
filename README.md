# SecureAttend (FAC)

SecureAttend is a face-based attendance and live monitoring dashboard built with **Next.js** and **face-api.js**.

## Features

- **Live monitoring**: real-time webcam stream + face detection/matching (`/live-monitor`)
- **Live attendance**: review recognized faces and recent captures (`/live-attendance`)
- **Captures API**: save/list PNG captures to `public/captures` (`/api/captures`)
- **Dashboard pages**: logs, analytics, student directory, system config

## Requirements

- Node.js (recommended: **Node 20+**)
- A modern browser with webcam access (Chrome works best)

## Setup

Install dependencies:

```bash
npm install
```

Download the required `face-api.js` model weights into `public/models`:

```bash
npm run download:face-models
```

Add known-face images (one image per person) to:

- `public/Faces/`

Then generate `public/Faces/knownFaces.json`:

```bash
npm run generate:known-faces
```

## Run

Start the dev server:

```bash
npm run dev
```

Open the app at `http://localhost:3000`.

## Key routes

- `/`: landing page
- `/live-monitor`: live monitoring dashboard
- `/live-attendance`: attendance flow (recognized faces + captures)
- `/attendance-logs`: attendance log view
- `/analytics`: analytics view
- `/student-directory`: student directory
- `/system-config`: configuration screen

## Captures storage

`POST /api/captures` accepts:

- `label`: string
- `imageDataUrl`: PNG data URL (`data:image/png;base64,...`)

It writes files to `public/captures/` and returns the public path (e.g. `/captures/<file>.png`).

## Model files

This app loads face-api models from `/models` at runtime (served from `public/models`).

If you prefer manual setup, see `public/models/README.md` for the required manifest + shard files.
