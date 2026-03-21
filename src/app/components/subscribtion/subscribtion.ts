import { Component, input } from '@angular/core';
import { IsPaidStatus } from "../is-paid-status/is-paid-status";
import { SubscriptionInterface } from '../../interfaces/subscribtions/subscription-interface';
import { ClickEffect } from "../../directives/click-effect/click-effect";

@Component({
  selector: 'assets-subscribtion',
  imports: [IsPaidStatus, ClickEffect],
  templateUrl: './subscribtion.html',
  styleUrl: './subscribtion.scss',
})
export class Subscribtion {
  subscribtionData = input<SubscriptionInterface>()
}
