# API Contract: Image OCR Upload

## Endpoint

`POST /api/ocr`

## Request

Headers:

- `Content-Type: multipart/form-data`

Body:

- `image`: file (required)
  - allowed MIME types: `image/png`, `image/jpeg`, `image/webp`
  - max size: 5 MB

## Response

### Success

HTTP 200

```json
{
  "foundText": true,
  "text": "Extracted text from the image",
  "message": "Text detected successfully"
}
```

### Empty result

HTTP 200

```json
{
  "foundText": false,
  "text": "",
  "message": "No text found in image"
}
```

### Validation error

HTTP 400

```json
{
  "error": "File must be PNG, JPEG, or WEBP and under 5 MB."
}
```

### Processing error

HTTP 502

```json
{
  "error": "Failed to process image with Google Cloud Vision."
}
```
