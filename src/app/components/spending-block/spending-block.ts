import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { TuiRingChart } from "@taiga-ui/addon-charts";
import { TuiAmountPipe } from '@taiga-ui/addon-commerce';
import { AsyncPipe } from '@angular/common';
import { SubscriptionInterface } from '../../interfaces/subscribtions/subscription-interface';

@Component({
  selector: 'spending-block',
  imports: [AsyncPipe, TuiAmountPipe, TuiRingChart],
  templateUrl: './spending-block.html',
  styleUrl: './spending-block.scss',
})
export class SpendingBlock {
  subscriptions = input<SubscriptionInterface[]>([])
  descriptionText = input<string>('')
  monthsToCalc = input<number>(1)
  isMobile = input<boolean>(false)

  names = signal<string[]>([])
  prices = signal<number[]>([])
  
  total = computed(() => {
    let sumValue = 0
    this.prices().forEach(val => sumValue += val)
    return sumValue
  })

  constructor() {
    effect(() => {
      let names: string[] = []
      let prices: number[] = []
      this.subscriptions().forEach(element => {
        names.push(element.name)
        prices.push(element.cost * this.monthsToCalc())
      })
      this.names.set(names)
      this.prices.set(prices)
    })
  }
  

  protected index = NaN

  protected get sum(): number {
    return (Number.isNaN(this.index) ? this.total() : this.prices()[this.index]) ?? 0
  }

  protected get label(): string {
    return (Number.isNaN(this.index) ? 'В сумме' : this.names()[this.index]) ?? ''
  }
}
function takeUntilDestroyed(destroyRef: any): import("rxjs").OperatorFunction<unknown, unknown> {
  throw new Error('Function not implemented.');
}

