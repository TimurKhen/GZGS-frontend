import {NgIf} from '@angular/common';
import {ChangeDetectionStrategy, Component, input, output, signal} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiFiles } from '@taiga-ui/kit';
import { TuiIcon } from "@taiga-ui/core";

@Component({
  selector: 'file-input',
  imports: [NgIf, ReactiveFormsModule, TuiFiles, TuiIcon],
  templateUrl: './file-input.html',
  styleUrl: './file-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileInput {
  control = input<any>()
  text = input<string>('Выберите фото')
  previewUrl = signal<string | ArrayBuffer | null>(null)
  fileSelect = output<File>()

  removeFile($event: Event): void {
    $event.preventDefault()
    this.control().setValue('')
  }
  
  getControlValue() {
    let value = this.control().value
    return this.displayPreview(value)
  }

  onFileChange($event: any) {
    const file = $event.target.files[0]
    this.displayPreview(file)
  }

  displayPreview(file: File) {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.previewUrl.set(e.target?.result || null)
      }
      reader.readAsDataURL(file)
      this.fileSelect.emit(file)
    }
  }
}
