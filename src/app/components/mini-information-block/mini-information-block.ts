import { Component, input } from '@angular/core';
import { MiniBlockInterface } from '../../interfaces/subscribtions/mini-block-interface';

@Component({
  selector: 'app-mini-information-block',
  imports: [],
  templateUrl: './mini-information-block.html',
  styleUrl: './mini-information-block.scss',
})
export class MiniInformationBlock {
  information = input<MiniBlockInterface>()
}
