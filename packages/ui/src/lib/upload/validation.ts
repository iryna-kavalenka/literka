export interface ValidationResult {
  valid: boolean;
  message: string;
}

export const ACCEPTED_MIME_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export function validateFile(
  file: File,
  acceptedTypes: string | string[] = ACCEPTED_MIME_TYPES,
  maxFileSizeMb = 5,
): ValidationResult {
  const acceptedMimeTypes =
    typeof acceptedTypes === 'string'
      ? acceptedTypes.split(',').map((type) => type.trim()).filter(Boolean)
      : acceptedTypes;

  if (!acceptedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      message: 'Unsupported file type. Only PNG, JPEG, and WEBP are allowed.',
    };
  }

  const maxFileSizeBytes = maxFileSizeMb * 1024 * 1024;
  if (file.size > maxFileSizeBytes) {
    return {
      valid: false,
      message: `File size must be ${maxFileSizeMb} MB or smaller.`,
    };
  }

  return { valid: true, message: 'OK' };
}
