import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { SubscriptionBig } from "../../components/subscriptions/subscription-big/subscription-big";
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { Filters } from "../../components/subscriptions/filters/filters";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-subscriptions-page',
  imports: [SubscriptionBig, Filters, RouterLink],
  templateUrl: './subscriptions-page.html',
  styleUrl: './subscriptions-page.scss',
})
export class SubscriptionsPage implements OnInit {
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
  filters = signal<boolean[]>([])
  filteredSubscriptions = signal<SubscriptionInterface[]>([])

  ngOnInit(): void {
    this.filterSubscriptions()
  }

  filterSubscriptions() {
    const filters = this.filters() 
    if (filters[0] == filters[1]) {
      this.filteredSubscriptions.set(this.realSubscriptions())
    } else {
      this.filteredSubscriptions.set(this.realSubscriptions().filter(
        (value: SubscriptionInterface) => {
          const isPaid = value.isPaid
          if (isPaid) {
            if (filters[0]) {
              return true
            } else {
              return false
            }
          } else {
            if (filters[1]) {
              return true
            } else {
              return false
            }
          }
        }
      ))
    }
  }

  changeFilter($event: boolean[]) {
    this.filters.set($event)
    this.filterSubscriptions()
  }
}
