import { Module } from '@nestjs/common';
import { OcrController } from './ocr/ocr.controller';
import { OcrService } from './ocr/ocr.service';

@Module({
  imports: [],
  controllers: [OcrController],
  providers: [OcrService],
})
export class AppModule {}
