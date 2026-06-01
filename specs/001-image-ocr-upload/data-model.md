# Data Model: Image OCR Upload

## Entities

### ImageUpload

- `file`: binary image payload (multipart/form-data)
- `type`: `image/png | image/jpeg | image/webp`
- `size`: integer, max 5 MB

### TextDetectionResult

- `text`: string
- `foundText`: boolean
- `message?`: string
- `detectedAt`: ISO timestamp

## State Model

### UploadUIState

- `selectedFile`: `File | null`
- `uploadStatus`: `idle | uploading | success | error`
- `progress`: `0..100`
- `resultText`: `string`
- `errorMessage`: `string | null`
- `noTextFound`: `boolean`

### Store Note

NgRx signal store state will keep the current upload result and validation state so the UI can remain reactive with zoneless Angular signals.
