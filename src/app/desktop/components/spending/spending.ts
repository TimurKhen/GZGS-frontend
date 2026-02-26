import { Component, computed, input, signal } from '@angular/core';
import {TuiRingChart} from '@taiga-ui/addon-charts';
import {TuiAmountPipe} from '@taiga-ui/addon-commerce';
import {tuiSum} from '@taiga-ui/cdk';
import { AsyncPipe, NgClass } from '@angular/common';
import { MiniInformationBlock } from "../../../components/mini-information-block/mini-information-block";
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';

@Component({
  selector: 'app-spending',
  imports: [AsyncPipe, TuiAmountPipe, TuiRingChart, MiniInformationBlock, NgClass],
  templateUrl: './spending.html',
  styleUrl: './spending.scss',
})
export class Spending {
  subscriptions = input<SubscriptionInterface[]>()
  smalledSubscribtions = computed(() => {
    const subscribtionLen = this.subscriptions()?.length
    if (!subscribtionLen) return []
    if (subscribtionLen > 6) {
      let spliced = this.subscriptions()?.splice(0, 5)
      return spliced
    } else {
      return this.subscriptions()
    }
  })
  activeButtonIndex = signal<number>(0)

  changeActiveButtonIndex(value: number) {
    this.activeButtonIndex.set(value)
  }

  private readonly labels = ['Food', 'Cafe', 'Open Source', 'Taxi', 'other'];
  protected readonly value = [13769, 12367, 10172, 3018, 2592];
  protected readonly total = tuiSum(...this.value);

  protected index = NaN;

  protected get sum(): number {
      return (Number.isNaN(this.index) ? this.total : this.value[this.index]) ?? 0;
  }

  protected get label(): string {
      return (Number.isNaN(this.index) ? 'Total' : this.labels[this.index]) ?? '';
  }
}
