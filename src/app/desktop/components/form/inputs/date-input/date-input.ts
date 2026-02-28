import { Component, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiTextfield } from "@taiga-ui/core";
import { TuiInputDate } from '@taiga-ui/kit';

@Component({
  selector: 'date-input',
  imports: [TuiInputDate, TuiTextfield, FormsModule],
  templateUrl: './date-input.html',
  styleUrl: './date-input.scss',
})
export class DateInput implements OnInit {
  placeholderText = input<string>()
  control = input<any>()
  dateValue = TuiDay.currentLocal()
  protected readonly today = TuiDay.currentLocal()

  ngOnInit(): void {
    let values = this.control().value
    if (values) {
      values = values.split('-')
      this.dateValue = new TuiDay(parseInt(values[0]), parseInt(values[1]), parseInt(values[2]))
    }
  }
}
