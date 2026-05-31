# Research Findings: Image OCR Upload

## Decision

Implement the feature as a frontend Angular page that accepts image uploads via both drag-and-drop and a file selection button, backed by a NestJS API that uses Google Cloud Vision to extract text.

## Rationale

- The existing workspace is an Nx Angular monorepo; building the frontend in `apps/web` keeps the feature aligned with current architecture.
- The user specifically requested Angular (zoneless, signals) and an NgRx signal store. The user expressed a preference for Tailwind + daisyUI, but to comply with the workspace constitution (SCSS-first), this feature will use SCSS-based styling for reusable components in `packages/ui`.
- NestJS is the preferred backend for structured API development in a TypeScript monorepo and integrates well with Nx.
- Google Cloud Vision is a managed OCR service with industry-grade text detection and removes the need to manage local OCR model accuracy or platform-specific build complexity.

## Alternatives Considered

- Local OCR with Tesseract or WASM
  - Rejected because it would add substantial bundle complexity and provide lower accuracy compared to Google Cloud Vision.
- Plain Express backend instead of NestJS
  - Rejected in favor of NestJS for stronger architectural consistency, dependency injection, and better future extensibility inside the monorepo.
- Base64 upload payload instead of multipart/form-data
  - Rejected because multipart/form-data is the standard browser file upload format and avoids unnecessary payload encoding overhead.
- Client-side only extraction
  - Rejected because the user requested a backend service and because Google Cloud Vision requires a server-side credentialed integration.

## Final Decisions

- Use a 5 MB maximum image upload size enforced by the frontend.
- Accept only common image MIME types: `image/png`, `image/jpeg`, and `image/webp`.
- Use a content-backed drag-and-drop upload area plus a select-from-device button in the UI.
- Expose a backend API endpoint at `POST /api/ocr` using `multipart/form-data` with a file field named `image`.
- Return a JSON response containing the extracted text and an explicit `foundText` boolean.
- Build a reusable UI component in `packages/ui` for the upload area and result display, then integrate it into `apps/web`.
