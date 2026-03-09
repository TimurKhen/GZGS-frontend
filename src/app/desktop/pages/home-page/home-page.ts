import { ChangeDetectionStrategy, Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Subscribtion } from "../../../components/subscribtion/subscribtion";
import { Spending } from "../../components/spending/spending";
import { ButtonWithImage } from "../../../components/button-with-image/button-with-image";
import { RouterLink } from "@angular/router";
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { SubscriptionsService } from '../../../services/api/subscriptions/subscriptions-service';
import { UserApiService } from '../../../services/api/user-api/user-api-service';

@Component({
  selector: 'app-home-page',
  imports: [Subscribtion, Spending, ButtonWithImage, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage implements OnInit, OnChanges {
  private userHandler = inject(UserApiService)
  private subscriptionsService = inject(SubscriptionsService)
  
  userName = signal<string>('')
  realSubscriptions = signal<SubscriptionInterface[]>([])
  
  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit()
  }

  ngOnInit(): void {
    this.subscriptionsService.userSubscriptions.subscribe((data: SubscriptionInterface[]) => {
      this.realSubscriptions.set(data)
    })

    const userData = this.userHandler.userInfo
    userData.subscribe((data) => {
      this.userName.set(String(data.user.fullname))
    })
  }
}
