import { Component, inject, OnInit, signal } from '@angular/core';
import { Subscribtion } from "../../../components/subscribtion/subscribtion";
import { Spending } from "../../components/spending/spending";
import { ButtonWithImage } from "../../../components/button-with-image/button-with-image";
import { Router, RouterLink } from "@angular/router";
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { SubscriptionsService } from '../../../services/api/subscriptions/subscriptions-service';

@Component({
  selector: 'app-home-page',
  imports: [Subscribtion, Spending, ButtonWithImage, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  private subscriptionsService = inject(SubscriptionsService)

  constructor(private router: Router) {}

  realSubscriptions = signal<SubscriptionInterface[]>([])

  ngOnInit(): void {
    this.subscriptionsService.userSubscriptions.subscribe((data: SubscriptionInterface[]) => {
      console.log(data)
      this.realSubscriptions.set(data)
    })
  }
}
