import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { masterURL } from '../masterURL';
import { SubscriptionInterface } from '../../../interfaces/subscribtions/subscription-interface';
import { UuidService } from '../../uuid/uuid-service';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { ErrorCatcherService } from '../../rxjs/error-catcher/error-catcher-service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private http = inject(HttpClient)
  private uuidService = inject(UuidService)
  private mainUrl = masterURL + '/' + 'api/subscriptions/'
  private currentUserSubscriptions = signal<SubscriptionInterface[]>([])
  private errorHandler = inject(ErrorCatcherService)
  
  protected showError(message: string): void {
    if (message == '{"isTrusted":true}') {
      message = 'Server offline'
    }
    this.errorHandler.showAlert(
      `${message}`,
      {
        appearance: 'negative',
        data: {
          theme: 'dark'
        }
      }
    )
  }

  private subscriptionDataChanger(subscriptions: SubscriptionInterface[]): SubscriptionInterface[] {
    return subscriptions.map(sub => ({
      ...sub,
      next_billing: sub.next_billing 
        ? `${sub.next_billing.split('T').at(0)}`
        : sub.next_billing,
      category: sub.category.toLocaleLowerCase(),
      subscription_avatar_url: sub.subscription_avatar_url 
        ? `${masterURL}${sub.subscription_avatar_url}`
        : sub.subscription_avatar_url,
    }))
  }

  clearSubscriptions() {
    this.currentUserSubscriptions.set([])
  }

  get userSubscriptions(): Observable<SubscriptionInterface[]> {
    if (this.currentUserSubscriptions().length == 0) {
      return this.getSubscriptions().pipe(
        map(val => this.subscriptionDataChanger(val)),
      )
    } else {
      return of(this.currentUserSubscriptions()).pipe(
        map(val => this.subscriptionDataChanger(val)),
      )
    }
  }

  createSubscription(subscriptionData: SubscriptionInterface) {
    const formData = new FormData()
    formData.append('subscription_id', this.uuidService.generateUUID())
    formData.append('user_id', this.uuidService.generateUUID())
    formData.append('name', subscriptionData.name)
    formData.append('cost', String(subscriptionData.cost).replace(/^0+/, ''))
    formData.append('next_billing', subscriptionData.next_billing)
    formData.append('status', 'false')
    formData.append('subscription_avatar', subscriptionData.subscription_avatar_url)
    formData.append('category', subscriptionData.category)
    formData.append('url_service', subscriptionData.url_service)
    formData.append('use_in_this_month', 'false')
    formData.append('cancellation_link', subscriptionData.cancellation_link)
    
    this.clearSubscriptions()
    return this.http.post(
      this.mainUrl + 'create',
      formData
    )
  }

  getSubscription(id: string) {
    return this.http.get<SubscriptionInterface>(
      this.mainUrl + `${id}`
    ).pipe(
      map((val: SubscriptionInterface) => {
        const arr: SubscriptionInterface[] = [val]
        return this.subscriptionDataChanger(arr)
      })
    )
  }

  getSubscriptions() {
    return this.http.get<SubscriptionInterface[]>(
      this.mainUrl + 'all'
    ).pipe(
      catchError((err) => {
        if (err.status === 500) {
          this.showError('Server error while getting subscriptions')
        }
        return throwError(err)
      }),
      tap(val => {
        this.currentUserSubscriptions.set(val)
      })
    )
  }

  getDiff(objectA: SubscriptionInterface, objectB: any): FormData {
    const formData = new FormData()
    
    Object.keys(objectB).forEach((key) => {
      if (key === 'subscription_id' || key === 'user_id' || (objectB[key] == '' && key == 'subscription_avatar_url')) {
        return
      }
      
      let finalKey = key
      let oldValue: any
      
      if (key == 'subscription_avatar_url') {
        finalKey = 'subscription_avatar'
        oldValue = objectA.subscription_avatar_url
      } else {
        const keyTyped = key as keyof SubscriptionInterface
        oldValue = objectA[keyTyped]
      }

      if (oldValue !== objectB[key]) {
        const value = objectB[key]
        formData.append(finalKey, value !== null && value !== undefined ? value : '')
      }
    })
    
    return formData
  }

  updateSubscription(currentData: SubscriptionInterface, changes: any, calcDiff: boolean = true) {
    this.clearSubscriptions()

    return this.http.patch(
      this.mainUrl + `update/${currentData.subscription_id}`,
      this.getDiff(currentData, changes)
    )
  }

  deleteSubscription(currentData: SubscriptionInterface) {
    this.clearSubscriptions()

    return this.http.delete(
      this.mainUrl + `delete/${currentData.subscription_id}`
    )
  }
}
