import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { OcrService } from './ocr.service';
import { MAX_FILE_SIZE_BYTES, validateImageFile } from './validators';

@Controller('ocr')
export class OcrController {
  constructor(private readonly ocrService: OcrService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      limits: {
        fileSize: MAX_FILE_SIZE_BYTES,
      },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No image file provided.');
    }

    const validation = validateImageFile(file);
    if (!validation.valid) {
      throw new BadRequestException(validation.message);
    }

    const text = await this.ocrService.detectText(file.buffer);
    return {
      foundText: Boolean(text),
      text,
      message: text ? 'Text detected successfully' : 'No text found in image',
    };
  }
}
