import { Component, computed, input } from '@angular/core';
import { Categoryinterface } from '../../../../interfaces/category/categoryinterface'
import { MiniInformationBlock } from "../../../../components/mini-information-block/mini-information-block";

@Component({
  selector: 'subscription-category',
  imports: [MiniInformationBlock],
  templateUrl: './subscription-category.html',
  styleUrl: './subscription-category.scss',
})
export class SubscriptionCategory {
  category = input<Categoryinterface>()
  smalledSubscribtions = computed(() => {
    const subscriptions = this.category()?.subscriptions
    const subscribtionLen = subscriptions?.length
    if (!subscribtionLen) return []
    if (subscribtionLen > 6) {
      let spliced = subscriptions.splice(0, 5)
      return spliced
    } else {
      return subscriptions
    }
  })

  getCostForYear(valuePerMonth: number | undefined) {
    if (valuePerMonth) {
      return valuePerMonth * 12
    } else {
      return ''
    }
  }
}
