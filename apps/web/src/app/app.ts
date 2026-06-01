import { Component } from '@angular/core';
import { OcrComponent } from './ocr/ocr.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [OcrComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
