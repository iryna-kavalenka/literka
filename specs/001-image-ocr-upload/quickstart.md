# Quickstart: Image OCR Upload

## Feature setup

1. Ensure dependencies are installed from the repository root:

```bash
npm install
```

2. Configure API credentials in the backend environment. Create a local `.env` file under `apps/api/` with:

```bash
GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type":"service_account", ... }'
```

3. Start the NestJS backend in a separate terminal:

```bash
npx nx serve api
```

4. Start the Angular web application:

```bash
npx nx serve web
```

5. Open the web app at `http://localhost:4200` and navigate to the image upload page.

6. Use either the drag-and-drop area or the "Select from device" button to choose an image file.

7. Submit the upload and verify the extracted text appears below the upload area.

## API contract

- Endpoint: `POST /api/ocr`
- Content type: `multipart/form-data`
- Body field: `image`
- Success response:

```json
{
  "foundText": true,
  "text": "Detected text here",
  "message": "Text detected successfully"
}
```

- Empty result response:

```json
{
  "foundText": false,
  "text": "",
  "message": "No text found in image"
}
```

- Error response:

```json
{
  "error": "Unsupported file type or failed OCR request"
}
```
