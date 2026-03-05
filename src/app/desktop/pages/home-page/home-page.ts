import { Component, inject, OnInit, signal } from '@angular/core';
import { Subscribtion } from "../../../components/subscribtion/subscribtion";
import { Spending } from "../../components/spending/spending";
import { ButtonWithImage } from "../../../components/button-with-image/button-with-image";
import { Router, RouterLink } from "@angular/router";
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { SubscriptionsService } from '../../../services/api/subscriptions/subscriptions-service';
import { UserApiService } from '../../../services/api/user-api/user-api-service';

@Component({
  selector: 'app-home-page',
  imports: [Subscribtion, Spending, ButtonWithImage, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit {
  private userHandler = inject(UserApiService)
  private subscriptionsService = inject(SubscriptionsService)

  constructor(private router: Router) {}

  userName = signal<string>('')
  realSubscriptions = signal<SubscriptionInterface[]>([])

  ngOnInit(): void {
    this.subscriptionsService.userSubscriptions.subscribe((data: SubscriptionInterface[]) => {
      this.realSubscriptions.set(data)
      console.log(this.realSubscriptions())
    })

    const userData = this.userHandler.userInfo
    if (userData === null) {
      this.userHandler.getUser().subscribe((data) => {
        this.userName.set(String(data.user.fullname))
      })      
    } else {
      this.userName.set(String(userData.user.fullname))
    }
  }
}
