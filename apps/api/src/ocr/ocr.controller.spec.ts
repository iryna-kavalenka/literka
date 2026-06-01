import { describe, expect, it, beforeEach, vi } from 'vitest';
import { OcrController } from './ocr.controller';

class MockOcrService {
  detectText = vi.fn().mockResolvedValue('hello world');
}

describe('OcrController', () => {
  let controller: OcrController;

  beforeEach(() => {
    controller = new OcrController(new MockOcrService() as any);
  });

  it('should throw for missing file', async () => {
    await expect(controller.upload(undefined as any)).rejects.toBeDefined();
  });

  it('should complete upload processing within 5 seconds for valid image uploads', async () => {
    const mockService = new MockOcrService();
    mockService.detectText = vi
      .fn()
      .mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return 'hello world';
      });

    controller = new OcrController(mockService as any);

    const fakeFile = {
      originalname: 'test.png',
      mimetype: 'image/png',
      buffer: Buffer.from('fake image data'),
    } as Express.Multer.File;

    const start = performance.now();
    const response = await controller.upload(fakeFile);
    const duration = performance.now() - start;

    expect(response).toEqual({
      foundText: true,
      text: 'hello world',
      message: 'Text detected successfully',
    });
    expect(duration).toBeLessThan(5000);
  });
});
