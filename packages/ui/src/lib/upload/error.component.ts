import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lui-upload-error',
  standalone: true,
  imports: [CommonModule],
  template: `@if (message()) {
    <div class="upload-error">{{ message() }}</div>
  }`,
  styles: [
    '.upload-error { color: #b91c1c; background: #fef2f2; border: 1px solid #fecaca; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.95rem; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadError {
  message = input<string | null>(null);
}
