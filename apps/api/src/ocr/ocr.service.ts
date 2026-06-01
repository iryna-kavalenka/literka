import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ImageAnnotatorClient } from '@google-cloud/vision';

@Injectable()
export class OcrService {
  private readonly client: ImageAnnotatorClient;

  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY;

    this.client = new ImageAnnotatorClient({ apiKey });
  }

  async detectText(fileBuffer: Buffer): Promise<string> {
    try {
      const [result] = await this.client.annotateImage({
        image: { content: fileBuffer },
        features: [{ type: 'TEXT_DETECTION' }],
      });

      const annotations = result.textAnnotations;
      if (!annotations || annotations.length === 0) {
        return '';
      }

      return annotations[0].description?.trim() ?? '';
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(
        'Failed to run OCR on the provided file.',
      );
    }
  }
}
