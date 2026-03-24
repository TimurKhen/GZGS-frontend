import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { SubscriptionInterface } from '../../../../interfaces/subscribtions/subscription-interface';
import { IsPaidStatus } from "../../../../components/is-paid-status/is-paid-status";
import { DateConverter } from '../../../../services/converters/date-converter/date-converter';
import { DatePipe } from '@angular/common';
import { ClickEffect } from "../../../../directives/click-effect/click-effect";

@Component({
  selector: 'subscription-big',
  imports: [IsPaidStatus, DatePipe, ClickEffect],
  templateUrl: './subscription-big.html',
  styleUrl: './subscription-big.scss',
  
})
export class SubscriptionBig {
  readonly dateConverter = inject(DateConverter)

  subscribtionData = input<SubscriptionInterface>()

  getCostForYear(valuePerMonth: number | undefined) {
    if (valuePerMonth) {
      return valuePerMonth * 12
    } else {
      return ''
    }
  }
}
