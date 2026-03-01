import { NgClass } from '@angular/common';
import { Component, effect, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiTextfield, TuiError } from "@taiga-ui/core";
import { TuiInputDate } from '@taiga-ui/kit';

@Component({
  selector: 'date-input',
  imports: [TuiInputDate, TuiTextfield, FormsModule, TuiError, NgClass],
  templateUrl: './date-input.html',
  styleUrl: './date-input.scss',
})
export class DateInput implements OnInit {
  placeholderText = input<string>()
  control = input<any>()
  isRequired = input<boolean>(false)

  dateValue: TuiDay | null = null
  protected readonly today = TuiDay.currentLocal()

  constructor() {
    effect(() => {
      const controlValue = this.control()?.value
      if (controlValue) {
        this.updateDateValueFromISO(controlValue)
      } else {
        this.dateValue = null
      }
    });
  }

  ngOnInit(): void {
    const initialValue = this.control()?.value;
    if (initialValue) {
      this.updateDateValueFromISO(initialValue)
    }
  }

  onDateChange(): void {
    if (this.dateValue && this.control()) {
      const isoDate = this.formatToISO(this.dateValue)
      this.control().setValue(isoDate)
      this.control().markAsTouched()
    } else if (this.control()) {
      this.control().setValue(null)
    }
  }

  private updateDateValueFromISO(isoString: string): void {
    if (!isoString) {
      this.dateValue = null
      return
    }

    const [year, month, day] = isoString.split('-').map(Number)
    this.dateValue = new TuiDay(year, month - 1, day)
  }

  private formatToISO(date: TuiDay): string {
    const year = date.year
    const month = String(date.month + 1).padStart(2, '0')
    const day = String(date.day).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}