import { Component, input } from '@angular/core';
import { IsPaidStatus } from "../is-paid-status/is-paid-status";
import { SubscriptionInterface } from '../../interfaces/subscribtions/subscription-interface';

@Component({
  selector: 'assets-subscribtion',
  imports: [IsPaidStatus],
  templateUrl: './subscribtion.html',
  styleUrl: './subscribtion.scss',
})
export class Subscribtion {
  subscribtionData = input<SubscriptionInterface>()
}
