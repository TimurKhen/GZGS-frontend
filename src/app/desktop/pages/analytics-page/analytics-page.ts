import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { SubscriptionBig } from "../../components/subscriptions/subscription-big/subscription-big";
import { RouterLink } from '@angular/router';
import { Filters } from "../../components/subscriptions/filters/filters";
import { SpendingBlock } from "../../../components/spending-block/spending-block";
import { TuiCheckbox } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { SubscriptionsService } from '../../../services/api/subscriptions/subscriptions-service';

@Component({
  selector: 'app-analytics-page',
  imports: [SubscriptionBig, RouterLink, Filters, SpendingBlock, TuiCheckbox, FormsModule],
  templateUrl: './analytics-page.html',
  styleUrl: './analytics-page.scss',
})
export class AnalyticsPage implements OnInit {
  private subscriptionsService = inject(SubscriptionsService)
  
  checkboxStates = signal<boolean[]>([])
  realSubscriptions = signal<SubscriptionInterface[]>([])
  usingForAnalityics = signal<SubscriptionInterface[]>(this.realSubscriptions())

  ngOnInit(): void {
    this.subscriptionsService.userSubscriptions.subscribe((data: SubscriptionInterface[]) => {
      this.realSubscriptions.set(data)
      this.checkboxStates.set(new Array(this.realSubscriptions().length).fill(true))
      this.recalculateAnalitycs()
    })
  }

  onCheckboxChange(checked: boolean, index: number) {
    this.checkboxStates()[index] = checked
    this.recalculateAnalitycs()
  }

  recalculateAnalitycs() {
    const currentStates = this.checkboxStates()
    const array = this.realSubscriptions()
    let filtered: SubscriptionInterface[] = []
    array.forEach((element: SubscriptionInterface, index: number) => {
      if (currentStates[index]) {
        filtered.push(element)
      }
    })
    this.usingForAnalityics.set(filtered)
  }

  changeFilter($event: boolean[]) {
    console.log($event)
  }
}
