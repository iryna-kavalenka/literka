import { Component, input, output } from '@angular/core';
import { FileItem } from '../../types/file-item';

@Component({
  selector: 'lui-finder',
  imports: [],
  templateUrl: './finder.html',
  styleUrl: './finder.scss',
})
export class Finder {
  data = input.required<FileItem[]>();

  openFolder = output<FileItem>();

  openFile = output<FileItem>();

  onOpenFolder(item: FileItem) {
    this.openFolder.emit(item);
  }

  onOpenFile(item: FileItem) {
    this.openFile.emit(item);
  }
}
