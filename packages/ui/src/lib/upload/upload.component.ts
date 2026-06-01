import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { validateFile } from './validation';
import { UploadError } from './error.component';

@Component({
  selector: 'lui-upload',
  standalone: true,
  imports: [CommonModule, UploadError],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadComponent {
  acceptedTypes = input('image/png,image/jpeg,image/webp');
  maxFileSizeMb = input(5);
  fileSelected = output<File>();
  validationError = output<string>();

  hasError = signal<string | null>(null);
  isDragging = signal(false);

  get acceptAttribute(): string {
    return this.acceptedTypes();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave() {
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files?.item(0);
    if (file) {
      this.handleFile(file);
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0);
    if (file) {
      this.handleFile(file);
      input.value = '';
    }
  }

  private handleFile(file: File) {
    const validation = validateFile(
      file,
      this.acceptedTypes(),
      this.maxFileSizeMb(),
    );
    if (!validation.valid) {
      this.hasError.set(validation.message);
      this.validationError.emit(validation.message);
      return;
    }

    this.hasError.set(null);
    this.validationError.emit('');
    this.fileSelected.emit(file);
  }
}
