import { describe, expect, it } from 'vitest';
import { validateFile } from './validation';

describe('validateFile', () => {
  it('accepts supported image types and size', () => {
    const file = { type: 'image/png', size: 1024 * 1024 } as File;
    const result = validateFile(file);

    expect(result.valid).toBe(true);
    expect(result.message).toBe('OK');
  });

  it('rejects unsupported image types', () => {
    const file = { type: 'text/plain', size: 1024 } as File;
    const result = validateFile(file);

    expect(result.valid).toBe(false);
    expect(result.message).toBe('Unsupported file type. Only PNG, JPEG, and WEBP are allowed.');
  });

  it('rejects files larger than the provided maxFileSizeMb', () => {
    const file = { type: 'image/jpeg', size: 3 * 1024 * 1024 } as File;
    const result = validateFile(file, 'image/jpeg', 2);

    expect(result.valid).toBe(false);
    expect(result.message).toBe('File size must be 2 MB or smaller.');
  });

  it('accepts a custom acceptedTypes list', () => {
    const file = { type: 'image/svg+xml', size: 1024 } as File;
    const result = validateFile(file, ['image/svg+xml']);

    expect(result.valid).toBe(true);
    expect(result.message).toBe('OK');
  });
});
