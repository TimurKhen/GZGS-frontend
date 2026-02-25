import { Component } from '@angular/core';
import { Subscribtion } from "../../../components/subscribtion/subscribtion";
import { SubscribtionBlockInterface } from '../../../interfaces/subscribtions/subscribtion-block-interface';
import { Spending } from "../../components/spending/spending";
import { MiniBlockInterface } from '../../../interfaces/subscribtions/mini-block-interface';

@Component({
  selector: 'app-home-page',
  imports: [Subscribtion, Spending],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {
  subscribtions: SubscribtionBlockInterface[] = [
    {
      name: 'Яндекс плюс',
      imageURL: 'https://logo-teka.com/wp-content/uploads/2026/02/yandex-plus-icon-logo.png',
      isPaid: true,
      pricePerMonth: 300
    },
    {
      name: 'Яндекс плюс 2',
      imageURL: 'https://logo-teka.com/wp-content/uploads/2026/02/yandex-plus-icon-logo.png',
      isPaid: false,
      pricePerMonth: 1300
    }
  ]
  forRingsubscribtions: MiniBlockInterface[] = [
    {
      name: 'Яндекс плюс',
      imageURL: 'https://logo-teka.com/wp-content/uploads/2026/02/yandex-plus-icon-logo.png',
      price: 300
    },
    {
      name: 'Яндекс плюс 2',
      imageURL: 'https://logo-teka.com/wp-content/uploads/2026/02/yandex-plus-icon-logo.png',
      price: 1300
    }
  ]
}
