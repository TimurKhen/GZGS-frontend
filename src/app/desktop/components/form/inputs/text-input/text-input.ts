import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield, TuiError } from "@taiga-ui/core";

@Component({
  selector: 'text-input',
  imports: [ReactiveFormsModule, TuiTextfield, NgClass, TuiError],
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInput implements OnInit {
  placeholderText = input<string>()
  control = input<any>()
  isRequred = input<boolean>(false)

  lastValue = signal<string>('')

  ngOnInit(): void {
    this.lastValue.set(this.control().value)
  }
}
