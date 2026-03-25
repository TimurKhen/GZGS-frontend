import { ChangeDetectionStrategy, Component, computed, effect, input, OnChanges, OnInit, signal, SimpleChange, SimpleChanges } from '@angular/core';
import {TuiRingChart} from '@taiga-ui/addon-charts';
import {TuiAmountPipe} from '@taiga-ui/addon-commerce';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { MiniInformationBlock } from "../../../components/mini-information-block/mini-information-block";
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { RouterLink } from "@angular/router";
import { TuiLoader, TuiButton } from "@taiga-ui/core";

@Component({
  selector: 'app-spending',
  imports: [AsyncPipe, TuiAmountPipe, TuiRingChart, MiniInformationBlock, NgClass, RouterLink, TuiLoader, TuiButton],
  templateUrl: './spending.html',
  styleUrl: './spending.scss',
  
})
export class Spending implements OnChanges {
  subscriptions = input<SubscriptionInterface[]>([])
  names = signal<string[]>([])
  prices = signal<number[]>([])
  isLoading = signal<boolean>(true)

  currentSmalledSubscribtions = signal<SubscriptionInterface[]>(
    this.subscriptions().filter((value: SubscriptionInterface) => {
      return value.status
  }))
  
  activeButtonIndex = signal<number>(0)
  maxSubscriptionsOnScreenCount = signal<number>(4)
  smalledCountOfSubscriptions = computed(() => {
    return this.currentSmalledSubscribtions().slice(0, this.maxSubscriptionsOnScreenCount())
  })

  constructor() {
    effect(() => {
      let names: string[] = []
      let prices: number[] = []
      this.currentSmalledSubscribtions().forEach(element => {
        names.push(element.name)
        prices.push(element.cost)
      })
      this.names.set(names)
      this.prices.set(prices)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.recalculateCurrentSubscriptions()
  }

  changeActiveButtonIndex(value: number) {
    this.activeButtonIndex.set(value)
    this.recalculateCurrentSubscriptions()
  }

  recalculateCurrentSubscriptions() {
    let isinvert = 0
    if (this.activeButtonIndex() === 1) {
      isinvert = 1
    }

    this.currentSmalledSubscribtions.set(
      this.subscriptions().filter(
        (value: SubscriptionInterface) => {
          const isPaid = Number(value.status) 
          return isPaid - isinvert
        }
      )
    )
    this.isLoading.set(false)
  }

  total = computed(() => {
    let sumValue = 0
    this.prices().forEach(val => sumValue += val)
    return sumValue
  })

  protected index = NaN

  protected get sum(): number {
    return (Number.isNaN(this.index) ? this.total() : this.prices()[this.index]) ?? 0
  }

  protected get label(): string {
    return (Number.isNaN(this.index) ? 'В сумме' : this.names()[this.index]) ?? ''
  }

  getCurrentMonth() {
    const months = [
      'январе', 'феврале', 'марте', 'апреле', 'мае', 'июне',
      'июле', 'августе', 'сентябре', 'октябре', 'ноябре', 'декабре'
    ];
    return months[new Date().getMonth()];
  }
}
