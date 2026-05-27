import {
  Component,
  contentChild,
  input,
  signal,
  TemplateRef,
} from '@angular/core';
import { FileItem } from '../../types/file-item';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'lui-folder',
  imports: [NgTemplateOutlet],
  templateUrl: './folder.html',
  styleUrl: './folder.scss',
})
export class Folder {
  name = input.required<string>();

  children = input.required<FileItem[]>();

  template = contentChild(TemplateRef);

  isExpanded = signal(false);

  onClick() {
    this.isExpanded.update((expanded) => !expanded);
  }
}
