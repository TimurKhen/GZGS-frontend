import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { SubscriptionBig } from "../../components/subscriptions/subscription-big/subscription-big";
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { Filters } from "../../components/subscriptions/filters/filters";
import { RouterLink } from "@angular/router";
import { SubscriptionsService } from '../../../services/api/subscriptions/subscriptions-service';


@Component({
  selector: 'app-subscriptions-page',
  imports: [SubscriptionBig, Filters, RouterLink],
  templateUrl: './subscriptions-page.html',
  styleUrl: './subscriptions-page.scss',
})
export class SubscriptionsPage implements OnInit {
  private subscriptionsService = inject(SubscriptionsService)
  
  realSubscriptions = signal<SubscriptionInterface[]>([])
  filters = signal<boolean[]>([])
  filteredSubscriptions = signal<SubscriptionInterface[]>([])

  ngOnInit(): void {
    this.subscriptionsService.userSubscriptions.subscribe((data: SubscriptionInterface[]) => {
      this.realSubscriptions.set(data)
      this.filterSubscriptions()
    })
  }

  filterSubscriptions() {
    const filters = this.filters() 
    if (filters[0] == filters[1]) {
      this.filteredSubscriptions.set(this.realSubscriptions())
    } else {
      this.filteredSubscriptions.set(this.realSubscriptions().filter(
        (value: SubscriptionInterface) => {
          const isPaid = value.status
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
