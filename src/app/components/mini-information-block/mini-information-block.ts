import { Component, input } from '@angular/core';
import { SubscriptionInterface } from '../../interfaces/subscribtions/subscription-interface';

@Component({
  selector: 'app-mini-information-block',
  imports: [],
  templateUrl: './mini-information-block.html',
  styleUrl: './mini-information-block.scss',
})
export class MiniInformationBlock {
  information = input<SubscriptionInterface>()
}
