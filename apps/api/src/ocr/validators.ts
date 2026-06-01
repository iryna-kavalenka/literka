export const ALLOWED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export function validateImageFile(file: Express.Multer.File): ValidationResult {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return {
      valid: false,
      message:
        'Unsupported file type. Only PNG, JPEG, and WEBP images are allowed.',
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      message: `File size must be ${MAX_FILE_SIZE_MB} MB or smaller.`,
    };
  }

  return { valid: true, message: 'OK' };
}
