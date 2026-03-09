import { NgClass } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiTextfieldComponent, TuiError } from "@taiga-ui/core";

@Component({
  selector: 'number-input',
  imports: [TuiTextfieldComponent, TuiError, NgClass, ReactiveFormsModule],
  templateUrl: './number-input.html',
  styleUrl: './number-input.scss',
})
export class NumberInput {
  placeholderText = input<string>()
  control = input<any>()
  isRequred = input<boolean>(false)
  lastValue = input<number>(1)

  constructor() {
    effect(() => {
      this.control().value = this.lastValue() 
    })
  }
}
