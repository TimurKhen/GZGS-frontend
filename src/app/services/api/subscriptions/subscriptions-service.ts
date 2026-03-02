import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { masterURL } from '../masterURL';
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { UuidService } from '../../uuid/uuid-service';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  basic = [{
      name: 'Яндекс плюс',
      subscription_avatar_url: 'https://logo-teka.com/wp-content/uploads/2026/02/yandex-plus-icon-logo.png',
      isPaid: true,
      cost: 300,
      next_billind: '2025-05-26',
      category: 'Технологии',
      url_service: '',
      cancellation_link: '',
      use_in_this_month: false,
      subscription_id: '1',
      user_id: '1'
    },
    {
      name: 'Яндекс плюс 2',
      subscription_avatar_url: 'https://logo-teka.com/wp-content/uploads/2026/02/yandex-plus-icon-logo.png',
      isPaid: false,
      cost: 1300,
      next_billind: '2025-01-26',
      category: 'Технологии',
      url_service: '',
      use_in_this_month: true,
      cancellation_link: '',
      subscription_id: '2',
      user_id: '1'
    }
  ]


  private http = inject(HttpClient)
  private uuidService = inject(UuidService)
  private mainUrl = masterURL + 'api/subscriptions/'
  private currentUserSubscriptions = signal<SubscriptionInterface[]>([])
  
  get userSubscriptions(): Observable<SubscriptionInterface[]> {
    if (this.currentUserSubscriptions().length === 0) {
      return this.getSubscriptions().pipe(
        catchError((err) => {
          if (err.status !== 200) {
            return of(this.basic);
          }
          return throwError(() => err);
        })
      )
    }

    return of(this.currentUserSubscriptions())
  }

  createSubscription(subscriptionData: SubscriptionInterface) {
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

  getSubscriptions() {
    return this.http.get<SubscriptionInterface[]>(
      this.mainUrl + 'get/subscriptions'
    ).pipe(
      tap(val => {
        this.currentUserSubscriptions.set(val)
      })
    )
  }

  updateSubscription(currentData: SubscriptionInterface, changes: SubscriptionInterface) {
    return this.http.patch(
      this.mainUrl + `update/${currentData.subscription_id}`,
      changes
    )
  }

  deleteSubscription(currentData: SubscriptionInterface) {
    return this.http.delete(
      this.mainUrl + `delete/${currentData.subscription_id}`
    )
  }
}
