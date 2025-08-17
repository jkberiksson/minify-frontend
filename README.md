# Minifizer

A web application for compressing video files with adjustable quality settings.

## Features

-   Video upload with drag-and-drop
-   Adjustable compression quality
-   Real-time size estimation
-   Video preview
-   ZIP file download

## Getting Started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Required

This frontend expects a backend server with `/upload-video` endpoint that accepts:

-   `video`: Video file (multipart/form-data)
-   `quality`: Quality percentage (1-100)

## Tech Stack

-   Next.js 15 + React 19
-   Tailwind CSS 4
-   shadcn/ui components
