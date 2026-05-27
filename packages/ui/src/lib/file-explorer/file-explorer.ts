import { Component, effect, input } from '@angular/core';
import { FileItem } from '../../types/file-item';
import { File } from '../file/file';
import { Folder } from '../folder/folder';

@Component({
  selector: 'lui-file-explorer',
  imports: [File, Folder],
  templateUrl: './file-explorer.html',
  styleUrl: './file-explorer.scss',
})
export class FileExplorer {
  data = input.required<FileItem[]>();

  constructor() {
    effect(() => {
      console.log(this.data());
    });
  }
}
