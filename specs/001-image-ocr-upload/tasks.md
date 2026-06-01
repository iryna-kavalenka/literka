# Tasks: Image OCR Upload

Phase 1: Setup

- [X] T001 Initialize NestJS app in apps/api with Nx generator (apps/api)
- [X] T002 Add `@google-cloud/vision` and environment config for service account in apps/api (apps/api/.env.example, apps/api/package.json)
- [X] T003 Add file upload handling (multer) and basic `/api/ocr` route scaffold in apps/api/src/ocr/ocr.controller.ts
- [X] T004 Create a reusable Upload UI component scaffold in packages/ui at packages/ui/src/lib/upload/

Phase 2: Foundational

- [X] T005 [P] Add SCSS-based styling and include upload component styles in `apps/web/src/styles.scss` (apps/web/src/styles.scss)
- [X] T006 [P] Add NgRx signal store slice for upload state at apps/web/src/app/store/upload.store.ts
- [X] T007 [P] Implement the Upload component in `packages/ui/src/lib/upload/upload.component.ts` with inputs/outputs and basic styling

Phase 3: User Stories (priority order)

User Story 1 - Upload image and extract text (P1)

- [X] T008 [US1] Implement drag-and-drop area and select-from-device button in `packages/ui/src/lib/upload/upload.component.ts`
- [X] T009 [US1] Integrate the upload component into `apps/web/src/app/ocr/ocr.component.ts` and page `apps/web/src/app/ocr/ocr.module.ts`
- [X] T010 [US1] Implement client-side validation (MIME types + <= 5 MB) in the upload component (packages/ui/src/lib/upload/validation.ts)
- [X] T011 [US1] Implement frontend service to POST multipart/form-data to `/api/ocr` at `apps/web/src/app/ocr/ocr.service.ts`
- [X] T012 [US1] Implement backend endpoint `POST /api/ocr` in `apps/api/src/ocr/ocr.controller.ts` and `apps/api/src/ocr/ocr.service.ts` to call Google Cloud Vision and return `{ foundText, text, message }`
- [X] T013 [US1] Wire NgRx signal store actions/selectors to reflect upload progress and results at apps/web/src/app/store/upload.store.ts

User Story 2 - Handle unsupported file types or validation failures (P2)

- [X] T014 [US2] Implement frontend validation error messages and inline UI feedback in packages/ui/src/lib/upload/error.component.ts and in `apps/web` integration
- [X] T015 [US2] Implement server-side validation for MIME types and size and return HTTP 400 responses in `apps/api/src/ocr/validators.ts`

User Story 3 - Show empty result state for images with no text (P3)

- [X] T016 [US3] Implement and style an explicit "No text found" result state in `packages/ui/src/lib/result/result.component.ts` and integrate into `apps/web/src/app/ocr/ocr.component.ts`

Final Phase: Polish & Cross-cutting Concerns

- [X] T017 Add unit tests for upload component and validation logic (packages/ui and apps/web)
- [X] T018 Add unit tests for NestJS OCR service and controller (apps/api/src/ocr/\*.spec.ts)
- [X] T019 Add e2e Cypress test for the full upload → OCR flow at `apps/web-e2e/src/e2e/ocr.cy.ts`
- [X] T020 Update `specs/001-image-ocr-upload/quickstart.md` and `README.md` with run instructions and environment setup
- [X] T021 Add Nx targets and CI job snippets to run `nx test`, `nx e2e` and lint for the new apps/packages (workspace.json / project.json updates)

Security & Ops

- [X] T022 Configure Google Cloud credentials handling: add `apps/api/.env.example`, CI secret injection, and least-privilege service account setup
- [X] T023 Add server-side protections: request size checks, rate-limiting, and basic abuse mitigation for `POST /api/ocr`
- [X] T024 Add a performance validation task to confirm OCR response time stays within 5 seconds for supported image uploads.

Dependencies

- `T012` depends on `T002` and `T003` (backend must have Vision client and upload route before integration)
- `T011` depends on `T008` and `T010` (frontend upload and validation must exist before wiring the service)
- `T013` depends on `T006` and `T011` (store and service must be available)

Parallel opportunities

- `T005`, `T006`, and `T007` can be worked on in parallel by separate engineers (frontend infra, store, and component scaffolding)
- Backend `T001`/`T002`/`T003` can be implemented in parallel with frontend `T004`/`T005`/`T006`

Implementation strategy

- MVP first: Complete the minimal path for `US1` (T008 → T012 → T011 → T013) to get a working end-to-end demo.
- Incrementally add validation (US2) and empty-state UI (US3).
- Add tests once flows are stable; prefer unit tests for components and service mocks for backend.

Estimated effort

- Phase 1: 1-2 days
- Phase 2: 1-2 days
- Phase 3 (US1): 2-3 days
- US2 + US3 + tests + polish: 2-3 days

Total: ~6-10 developer-days depending on parallelization and familiarity with NestJS and Google Cloud Vision.
