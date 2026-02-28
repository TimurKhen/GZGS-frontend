import { Component, signal } from '@angular/core';
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { SubscriptionBig } from "../../components/subscriptions/subscription-big/subscription-big";
import { RouterLink } from '@angular/router';
import { Filters } from "../../components/subscriptions/filters/filters";
import { SpendingBlock } from "../../../components/spending-block/spending-block";

@Component({
  selector: 'app-analytics-page',
  imports: [SubscriptionBig, RouterLink, Filters, SpendingBlock],
  templateUrl: './analytics-page.html',
  styleUrl: './analytics-page.scss',
})
export class AnalyticsPage {
  realSubscriptions = signal<SubscriptionInterface[]>([
    {
      name: 'Яндекс плюс',
      subscription_avatar_url: 'https://logo-teka.com/wp-content/uploads/2026/02/yandex-plus-icon-logo.png',
      isPaid: true,
      cost: 300,
      next_billind: '2025-05-26',
      category: 'Технологии',
      url_service: '',
      cancellation_link: '',
      use_in_this_month: false,
      subscription_id: '1'
    },
    {
      name: 'Яндекс плюс',
      subscription_avatar_url: 'https://logo-teka.com/wp-content/uploads/2026/02/yandex-plus-icon-logo.png',
      isPaid: false,
      cost: 1300,
      next_billind: '2025-01-26',
      category: 'Технологии',
      url_service: '',
      use_in_this_month: true,
      cancellation_link: '',
      subscription_id: '2'
    }
  ])

  usingForAnalityics = signal<SubscriptionInterface[]>([])

  updateChecked() {

  }

  changeFilter($event: boolean[]) {
    console.log($event)
  }
}
