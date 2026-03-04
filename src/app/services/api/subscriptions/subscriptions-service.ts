import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { masterURL } from '../masterURL';
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { UuidService } from '../../uuid/uuid-service';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  basic = [{
      name: 'Яндекс плюс',
      subscription_avatar_url: 'https://logo-teka.com/wp-content/uploads/2026/02/yandex-plus-icon-logo.png',
      status: true,
      cost: 300,
      next_billing: '2025-05-26',
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
      status: false,
      cost: 1300,
      next_billing: '2025-01-26',
      category: 'Технологии',
      url_service: '',
      use_in_this_month: true,
      cancellation_link: '',
      subscription_id: '2',
      user_id: '1'
    },
    {
      name: 'Яндекс музыка',
      subscription_avatar_url: 'https://img.freepik.com/premium-vector/yandex-music-logo_578229-242.jpg?w=360',
      status: true,
      cost: 400,
      next_billing: '2025-01-26',
      category: 'Музыка',
      url_service: '',
      use_in_this_month: true,
      cancellation_link: '',
      subscription_id: '3',
      user_id: '1'
    },
    {
      name: 'Тбанк',
      subscription_avatar_url: 'https://cdnn21.img.ria.ru/images/07e8/02/0f/1927608429_0:0:640:640_1920x0_80_0_0_ae1300a0f202fd1faf907e77f424e55b.jpg',
      status: false,
      cost: 2000,
      next_billing: '2025-01-26',
      category: 'Музыка',
      url_service: '',
      use_in_this_month: false,
      cancellation_link: '',
      subscription_id: '4',
      user_id: '1'
    }
  ]


  private http = inject(HttpClient)
  private uuidService = inject(UuidService)
  private mainUrl = masterURL + '/' + 'api/subscriptions/'
  private currentUserSubscriptions = signal<SubscriptionInterface[]>([])
  
  private addLocalhostPrefix(subscriptions: SubscriptionInterface[]): SubscriptionInterface[] {
    return subscriptions.map(sub => ({
      ...sub,
      subscription_avatar_url: sub.subscription_avatar_url 
        ? `${masterURL}${sub.subscription_avatar_url}`
        : sub.subscription_avatar_url
    }));
  }

  get userSubscriptions(): Observable<SubscriptionInterface[]> {
    if (this.currentUserSubscriptions().length === 0) {
      return this.getSubscriptions().pipe(
        catchError((err) => {
          if (err.status !== 200) {
            return of(this.basic)
          }
          return throwError(() => err)
        }),
        map(val => this.addLocalhostPrefix(val))
      )
    }

    return of(this.currentUserSubscriptions())
  }

  createSubscription(subscriptionData: SubscriptionInterface) {
    console.log(subscriptionData)
    
    const formData = new FormData()
    formData.append('subscription_id', this.uuidService.generateUUID())
    formData.append('user_id', this.uuidService.generateUUID())
    formData.append('name', subscriptionData.name)
    formData.append('cost', String(subscriptionData.cost))
    formData.append('next_billing', subscriptionData.next_billing)
    formData.append('status', 'false')
    formData.append('subscription_avatar', subscriptionData.subscription_avatar_url)
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
      this.mainUrl + 'all'
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
