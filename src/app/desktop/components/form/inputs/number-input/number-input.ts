import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';
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

  lastValue = signal<string>('')

  ngOnInit(): void {
    this.lastValue.set(this.control().value)
  }
}
