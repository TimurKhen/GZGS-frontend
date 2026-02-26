import { Component, input } from '@angular/core';
import { TuiIcon } from "@taiga-ui/core";

@Component({
  selector: 'is-paid-status',
  imports: [TuiIcon],
  templateUrl: './is-paid-status.html',
  styleUrl: './is-paid-status.scss',
})
export class IsPaidStatus {
  isPaid = input<boolean>()
}
