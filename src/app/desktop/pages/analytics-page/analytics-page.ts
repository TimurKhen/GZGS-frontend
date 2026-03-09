import { Component, inject, OnInit, signal } from '@angular/core';
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { SubscriptionBig } from "../../components/subscriptions/subscription-big/subscription-big";
import { RouterLink } from '@angular/router';
import { Filters } from "../../components/subscriptions/filters/filters";
import { SpendingBlock } from "../../../components/spending-block/spending-block";
import { TuiCheckbox } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { SubscriptionsService } from '../../../services/api/subscriptions/subscriptions-service';
import { Categoryinterface } from '../../../interfaces/category/categoryinterface';
import { SubscriptionCategory } from "../../components/subscriptions/subscription-category/subscription-category";
import { NgTemplateOutlet } from '@angular/common';
import { TuiLoader } from "@taiga-ui/core";

@Component({
  selector: 'app-analytics-page',
  imports: [SubscriptionBig,
    RouterLink, Filters, SpendingBlock,
    TuiCheckbox, FormsModule, SubscriptionCategory,
    NgTemplateOutlet, TuiLoader],
  templateUrl: './analytics-page.html',
  styleUrl: './analytics-page.scss',
})
export class AnalyticsPage implements OnInit {
  private subscriptionsService = inject(SubscriptionsService)
  
  checkboxStates = signal<boolean[]>([])
  realSubscriptions = signal<SubscriptionInterface[]>([])
  usingForAnalityics = signal<SubscriptionInterface[]>(this.realSubscriptions())
  categories = signal<Categoryinterface[]>([])
  
  isLoading = signal<boolean>(true)
  selectedGroup = signal<string>('Сервисы')
  types = ['Сервисы', 'Категории']

  ngOnInit(): void {
    this.subscriptionsService.userSubscriptions.subscribe((data: SubscriptionInterface[]) => {
      this.realSubscriptions.set(data)
      this.checkboxStates.set(new Array(this.realSubscriptions().length).fill(true))
      this.recalculateAnalitycs()
      this.recalculateCategories()
      this.isLoading.set(false)
    })
  }

  onCheckboxChange(checked: boolean, index: number) {
    this.checkboxStates()[index] = checked
    this.recalculateHandler()
  }

  recalculateHandler() {
    if (this.selectedGroup() === this.types[0]) {
      this.recalculateAnalitycs()
    }
  }

  recalculateAnalitycs() {
    const currentStates = this.checkboxStates()
    const array = this.realSubscriptions()
    let filtered: SubscriptionInterface[] = []
    array.forEach((element: SubscriptionInterface, index: number) => {
      if (currentStates[index]) {
        filtered.push(element)
      } else {
        const copy = structuredClone(element) 
        copy.cost = 0
        filtered.push(copy)
      }
    })
    this.usingForAnalityics.set(filtered)
  }

  recalculateCategories() {
    const array = this.realSubscriptions()
    
    const categoriesMap = new Map<string, { cost: number, subscriptions: SubscriptionInterface[] }>()

    array.forEach((subscription: SubscriptionInterface) => {
      const categoryName = subscription.category
      const currentData = categoriesMap.get(categoryName) || { cost: 0, subscriptions: [] }
      
      currentData.cost += subscription.cost
      currentData.subscriptions.push(subscription)
      
      categoriesMap.set(categoryName, currentData)
    })
    
    const categories: Categoryinterface[] = []
    categoriesMap.forEach((data, name) => {
      categories.push({ 
        name: name, 
        cost: data.cost,
        subscriptions: data.subscriptions
      })
    })
  
    this.categories.set(categories)
  }


  changeFilter($event: any) {
    this.selectedGroup.set(this.types[this.types.indexOf($event)])
    this.recalculateHandler()
  }
}
