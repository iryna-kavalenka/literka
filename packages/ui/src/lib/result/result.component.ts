import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lui-ocr-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  foundText = input(false);
  text = input('');
  message = input('');
}
