# Quickstart: Image OCR Upload

## Feature setup

1. Ensure dependencies are installed from the repository root:

```bash
npm install
```

2. Start the Angular web application:

```bash
npx nx serve web
```

3. In a separate terminal, start the NestJS backend once it is added to the monorepo.

4. Open the web app at `http://localhost:4200` and navigate to the image upload page.

5. Use either the drag-and-drop area or the "Select from device" button to choose an image file.

6. Submit the upload and verify the extracted text appears below the upload area.

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
