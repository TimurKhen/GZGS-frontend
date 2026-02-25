import { Component, input } from '@angular/core';
import { SubscribtionBlockInterface } from '../../interfaces/subscribtions/subscribtion-block-interface';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'assets-subscribtion',
  imports: [TuiIcon],
  templateUrl: './subscribtion.html',
  styleUrl: './subscribtion.scss',
})
export class Subscribtion {
  subscribtionData = input<SubscribtionBlockInterface>()
}
