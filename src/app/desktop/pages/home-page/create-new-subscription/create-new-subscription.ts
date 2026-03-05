import { Component, inject, signal } from '@angular/core';
import { TuiIcon } from "@taiga-ui/core";
import { FileInput } from "../../../components/form/inputs/file-input/file-input";
import { TextInput } from "../../../components/form/inputs/text-input/text-input";
import { DateInput } from "../../../components/form/inputs/date-input/date-input";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberInput } from "../../../components/form/inputs/number-input/number-input";
import { Router, RouterLink } from "@angular/router";
import { SubscriptionsService } from '../../../../services/api/subscriptions/subscriptions-service';
import { Subscribtion } from '../../../../components/subscribtion/subscribtion';
import { SubscriptionInterface } from '../../../../interfaces/subscribtions/subscription-interface';
import { catchError, throwError } from 'rxjs';
import { ErrorCatcherService } from '../../../../services/rxjs/error-catcher/error-catcher-service';

@Component({
  selector: 'app-create-new-subscription',
  imports: [TuiIcon, FileInput, TextInput, DateInput, NumberInput, RouterLink],
  templateUrl: './create-new-subscription.html',
  styleUrl: './create-new-subscription.scss',
})
export class CreateNewSubscription {
  subcsriptionService = inject(SubscriptionsService)
  errorHandler = inject(ErrorCatcherService)

  subscriptionForm = new FormGroup({
    subscription_avatar_url: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    cost: new FormControl(0, [Validators.required, Validators.min(0)]),
    next_billing: new FormControl('', [Validators.required]),
    url_service: new FormControl(''),
    cancellation_link: new FormControl(''),
    category: new FormControl('', [Validators.required])
  })
  isLoading = signal<boolean>(false)

  constructor(private router: Router) {}

  createSubscription($event: Event) {
    $event.preventDefault()
    this.isLoading.set(true)
    this.subcsriptionService.createSubscription(this.subscriptionForm.value as SubscriptionInterface)
      .pipe(
        catchError((err) => {
          this.showError(`${err.statusText}: ${err.status}`)
          this.isLoading.set(false)
          return throwError(err)
        })
      )
      .subscribe((data) => {
        this.isLoading.set(false)
        this.router.navigate(['/'])
      })
  }  
  showError(message: string) {
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
}
