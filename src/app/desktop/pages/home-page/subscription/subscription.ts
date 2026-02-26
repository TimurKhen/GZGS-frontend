import { Component, OnInit, signal } from '@angular/core';
import { TuiIcon } from "@taiga-ui/core";
import { IsPaidStatus } from "../../../../components/is-paid-status/is-paid-status";
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionInterface } from '../../../../interfaces/subscribtions/subscription-interface';

@Component({
  selector: 'app-subscription',
  imports: [TuiIcon, IsPaidStatus, DatePipe],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss',
})
export class Subscription implements OnInit {
  subscriptionData = signal<any>(null)
  subscriptionId = signal<string | null>(null)
  
  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.subscriptionId.set(id)
        this.subscriptionData.set(this.loadSubscriptionById(id))
      }
    })
  }

  loadSubscriptionById(id: string): SubscriptionInterface {
    return {
      name: 'Яндекс плюс',
      subscription_avatar_url: 'https://logo-teka.com/wp-content/uploads/2026/02/yandex-plus-icon-logo.png',
      isPaid: true,
      cost: 300,
      next_billind: '2025-05-26',
      category: 'Технологии',
      url_service: '',
      use_in_this_month: false,
      subscription_id: '1'
    }
  }

  parseDate(dateString: string | undefined) {
    if (dateString) {
      return new Date(dateString)
    } else {
      return ''
    }
  }
}