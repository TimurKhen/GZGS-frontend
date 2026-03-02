import { Component, input } from '@angular/core';
import { SubscriptionInterface } from '../../interfaces/subscribtions/subscription-interface';
import { TuiIcon } from "@taiga-ui/core";

@Component({
  selector: 'app-mini-information-block',
  imports: [TuiIcon],
  templateUrl: './mini-information-block.html',
  styleUrl: './mini-information-block.scss',
})
export class MiniInformationBlock {
  information = input<SubscriptionInterface>()
}
