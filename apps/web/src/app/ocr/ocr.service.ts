import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, lastValueFrom, map } from 'rxjs';

export interface OcrResponse {
  foundText: boolean;
  text: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class OcrService {
  constructor(private readonly http: HttpClient) {}

  upload(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<OcrResponse>('/api/ocr', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  async uploadAndGetResult(file: File): Promise<OcrResponse> {
    const response = await lastValueFrom(
      this.upload(file).pipe(
        filter(
          (event): event is HttpResponse<OcrResponse> =>
            event.type === HttpEventType.Response,
        ),
        map((event) => event.body),
      ),
    );

    if (!response) {
      throw new Error('No response body received from OCR upload.');
    }

    return response;
  }
}
