import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { UploadComponent } from '@literka/ui';
import { ResultComponent } from '@literka/ui';
import {
  resetUploadState,
  setUploadError,
  setUploadProgress,
  setUploadSuccess,
  uploadState,
} from '../store/upload.store';
import { OcrService } from './ocr.service';

@Component({
  selector: 'app-ocr',
  standalone: true,
  imports: [CommonModule, HttpClientModule, UploadComponent, ResultComponent],
  templateUrl: './ocr.component.html',
  styleUrl: './ocr.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OcrComponent implements OnInit {
  uploadState = uploadState;

  constructor(private readonly ocrService: OcrService) {}

  ngOnInit(): void {
    resetUploadState();
  }

  onFileSelected(file: File) {
    resetUploadState();
    setUploadProgress(0);

    this.ocrService.upload(file).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
        }

        if (event.type === HttpEventType.Response && event.body) {
          setUploadSuccess(event.body.text ?? '');
        }
      },
      error: (error: HttpErrorResponse) => {
        setUploadError(
          error?.error?.message ||
            'Unsupported file type or failed OCR request.',
        );
      },
    });
  }
}
