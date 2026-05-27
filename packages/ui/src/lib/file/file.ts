import { Component, input } from '@angular/core';

@Component({
  selector: 'lui-file',
  imports: [],
  templateUrl: './file.html',
  styleUrl: './file.scss',
})
export class File {
  name = input.required();

  onClick() {
    console.log(`Request to open file: `, this.name());
  }
}
