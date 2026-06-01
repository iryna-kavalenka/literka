import { describe, expect, it } from 'vitest';
import { OcrService } from './ocr.service';

describe('OcrService', () => {
  it('should create the service', () => {
    const service = new OcrService();
    expect(service).toBeTruthy();
  });
});
