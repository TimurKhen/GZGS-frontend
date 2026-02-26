import { Component, input } from '@angular/core';

@Component({
  selector: 'button-with-image',
  imports: [],
  templateUrl: './button-with-image.html',
  styleUrl: './button-with-image.scss',
})
export class ButtonWithImage {
  imageURL = input<string>()
  label = input<string>()
}
