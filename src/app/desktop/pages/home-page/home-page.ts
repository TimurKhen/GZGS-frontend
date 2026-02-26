import { Component } from '@angular/core';
import { Subscribtion } from "../../../components/subscribtion/subscribtion";
import { Spending } from "../../components/spending/spending";
import { ButtonWithImage } from "../../../components/button-with-image/button-with-image";
import { Router, RouterLink } from "@angular/router";
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';

@Component({
  selector: 'app-home-page',
  imports: [Subscribtion, Spending, ButtonWithImage, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  constructor(private router: Router) {}

  realSubscriptions: SubscriptionInterface[] = [
    {
      name: 'Яндекс плюс',
      subscription_avatar_url: 'https://logo-teka.com/wp-content/uploads/2026/02/yandex-plus-icon-logo.png',
      isPaid: true,
      cost: 300,
      next_billind: '2025-05-26',
      category: 'Технологии',
      url_service: '',
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
      subscription_id: '2'
    }
  ]
}
