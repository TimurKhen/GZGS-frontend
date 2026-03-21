import { Component, input } from '@angular/core';
import { SubscriptionInterface } from '../../interfaces/subscribtions/subscription-interface';
import { TuiIcon } from "@taiga-ui/core";
import { ShortNumberPipe } from '../../pipes/short-number-pipe-pipe';
import { ClickEffect } from "../../directives/click-effect/click-effect";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-mini-information-block',
  imports: [TuiIcon, ShortNumberPipe, ClickEffect, RouterLink],
  templateUrl: './mini-information-block.html',
  styleUrl: './mini-information-block.scss',
})
export class MiniInformationBlock {
  information = input<SubscriptionInterface>()
  pathDepth = input<number>(0)

  setPath(val: string) {
    return '../'.repeat(this.pathDepth()) + val 
  }
}
