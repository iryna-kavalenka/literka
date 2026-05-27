import { Component, computed, signal } from '@angular/core';
import { FileExplorer, Finder } from '@literka/ui';
import { FileItem } from './core/file/file-item';
@Component({
  imports: [FileExplorer, Finder],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  onOpenFile(file: FileItem) {}

  onBreadcrumbClick(index: number) {
    const folder = this.breadcrumbs()[index];
    this.breadcrumbs.set(
      index === 0
        ? this.breadcrumbs().slice(0, 1)
        : this.breadcrumbs().slice(0, index + 1),
    );
    this.activeFolder.set(folder);
  }

  onOpenFolder(folder: FileItem) {
    this.activeFolder.set(folder);
    this.breadcrumbs.set([...this.breadcrumbs(), folder]);
  }

  onGoBack() {
    this.breadcrumbs.set(this.breadcrumbs().slice(0, -1));
    const [last] = this.breadcrumbs().slice(-1);
    this.activeFolder.set(last);
  }

  breadcrumbs = signal<FileItem[]>([]);

  activeFolder = signal<FileItem | null>(null);

  finderData = computed<FileItem[]>(() =>
    this.activeFolder()
      ? (this.activeFolder()?.children ?? [])
      : (this.fileData() ?? []),
  );

  constructor() {}

  fileData = signal<FileItem[]>([
    {
      id: 1,
      name: 'README.md',
    },
    {
      id: 2,
      name: 'Documents 1',
      children: [
        {
          id: 3,
          name: 'Word.doc',
        },
        {
          id: 4,
          name: 'Powerpoint.ppt',
        },
        {
          id: 5,
          name: 'Documents 2',
          children: [
            {
              id: 6,
              name: 'Word.doc',
            },
            {
              id: 7,
              name: 'Powerpoint.ppt',
            },
            {
              id: 8,
              name: 'Documents 3',
              children: [],
            },
          ],
        },
      ],
    },
  ]);
}
