import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { masterURL } from '../masterURL';
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { UuidService } from '../../uuid/uuid-service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private http = inject(HttpClient)
  private router = inject(Router)  
  private uuidService = inject(UuidService)
  private mainUrl = masterURL + 'api/subscriptions/'

  createSubscription(subscriptionData: SubscriptionInterface) {
      // {
      //   "subscription_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      //   "user_id": "550e8400-e29b-41d4-a716-446655440000",
      //   "name": "yandex plus",
      //   "cost": 150.54,
      //   "next_billing": "2026-03-01T12:25:19.454Z",
      //   "status": "unpaid",
      //   "subscription_avatar_url": "url/url/url/avatar.png",
      //   "category": "music",
      //   "url_service": "url for some service",
      //   "use_in_this_month": false,
      //   "cancellation_link": "link to cancellation service"
      // }
      
    const formData = new FormData()
    formData.append('subscription_id', this.uuidService.generateUUID())
    formData.append('user_id', this.uuidService.generateUUID())
    formData.append('name', subscriptionData.name)
    formData.append('cost', String(subscriptionData.cost))
    formData.append('next_billing', subscriptionData.next_billind)
    formData.append('status', 'false')
    formData.append('subscription_avatar_url', subscriptionData.subscription_avatar_url)
    formData.append('category', subscriptionData.category)
    formData.append('url_service', subscriptionData.url_service)
    formData.append('use_in_this_month', 'false')
    formData.append('cancellation_link', subscriptionData.cancellation_link)
    
    return this.http.post(
      this.mainUrl + 'create',
      formData
    )
  }
}
