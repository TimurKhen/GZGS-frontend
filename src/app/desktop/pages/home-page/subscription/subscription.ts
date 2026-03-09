import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TuiAlertService, TuiIcon } from "@taiga-ui/core";
import { IsPaidStatus } from "../../../../components/is-paid-status/is-paid-status";
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusBlock } from "../../../components/status-block/status-block";
import { StatusBlockInterface } from '../../../../interfaces/status-block/status-block-interface';
import { ActionButtonInterface } from '../../../../interfaces/action-button/action-button-interface';
import { Clipboard } from '@angular/cdk/clipboard';
import { FileInput } from "../../../components/form/inputs/file-input/file-input";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextInput } from "../../../components/form/inputs/text-input/text-input";
import { DateInput } from "../../../components/form/inputs/date-input/date-input";
import { DateConverter } from '../../../../services/converters/date-converter/date-converter';
import { SubscriptionsService } from '../../../../services/api/subscriptions/subscriptions-service';
import { SubscriptionInterface } from '../../../../interfaces/subscribtions/subscription-interface';
import { catchError, debounceTime, of, Subject, switchMap, throwError } from 'rxjs';
import { ErrorCatcherService } from '../../../../services/rxjs/error-catcher/error-catcher-service';
import { NumberInput } from '../../../components/form/inputs/number-input/number-input';


@Component({
  selector: 'app-subscription',
  imports: [TuiIcon, IsPaidStatus, DatePipe, StatusBlock, FileInput, TextInput, DateInput, NumberInput],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss',
})
export class Subscription implements OnInit {
  readonly dateConverter = inject(DateConverter)
  private subscriptionsService = inject(SubscriptionsService)
  private readonly alerts = inject(TuiAlertService)
  private readonly errorHandler = inject(ErrorCatcherService)
  paidStatusSubject = new Subject<any>()
  usedStatusSubject = new Subject<any>()

  subscriptionData = signal<any>(null)
  subscriptionId = signal<string | null>(null)
  
  isPaidStatusBlock = signal<StatusBlockInterface>({
    icon: null,
    text: 'Подписка оплачена',
    secondText: 'Подписка не оплачена',
    buttonText: 'Поменять',
    secondButtonText: 'Оплачена',
    isActive: true,
    subject: this.paidStatusSubject,
  })
  usedStatusBlock = signal<StatusBlockInterface>({
    icon: null,
    text: 'Подписка использована',
    secondText: 'Подписка не использована',
    buttonText: 'Поменять',
    secondButtonText: 'Использована',
    isActive: false,
    subject: this.usedStatusSubject,
  })

  actionButtons = signal<ActionButtonInterface[]>([
    {
      name: 'Перейти к сервису',
      action: () => {
        let url: string = this.subscriptionData().url_service
        if (url.includes('http')) {
          window.open(url, '_blank')
        } else {
          url = `https://${url}`
          window.open(url, '_blank')
        }
      }
    },
    {
      name: 'Перейти к отмене подписки',
      action: () => {
        let url = this.subscriptionData().cancellation_link
        if (url.includes('http')) {
          window.open(url, '_blank')
        } else {
          url = `https://${url}`
          window.open(url, '_blank')
        }
      }
    },
    {
      name: 'Скопировать письмо для отмены',
      action: () => {
        this.clipboard.copy(`Здравствуйте, я желаю прекратить использование сервиса: "${this.subscriptionData().name}" по собственному желанию.`)

        this.errorHandler.showAlert(
          `Текст был скопирован`,
          {}
        )
      }
    }
  ])
  
  editForm = new FormGroup({
    subscription_avatar_url: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    cost: new FormControl(1, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]*$")]),
    next_billing: new FormControl('', [Validators.required]),
    url_service: new FormControl(''),
    cancellation_link: new FormControl(''),
    category: new FormControl('', [Validators.required])
  })

  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipboard: Clipboard
  ) {
    this.paidStatusSubject
      .pipe(
        debounceTime(500),
        switchMap((val) => {
          return val
        })
      )
      .subscribe((data) => {  
        this.updateStatusField('status')
      }
    )

    this.usedStatusSubject.pipe(
        debounceTime(500),
        switchMap((val) => {
          return val
        })
      )
      .subscribe((data) => {  
        this.updateStatusField('use_in_this_month')
      }
    )
  }

  private updateStatusField(field: 'status' | 'use_in_this_month'): void {
    const currentData = this.subscriptionData();
    if (!currentData) return;

    const changes: any = {
      [field]: !currentData[field]
    }

    this.subscriptionsService.updateSubscription(currentData, changes)
      .pipe(
        catchError((err) => {
          this.showError(`${err.statusText}: ${err.status}`)

          const statusBlock = field === 'status' ? this.isPaidStatusBlock : this.usedStatusBlock;
          statusBlock.update(data => ({
            ...data,
            isActive: currentData[field]
          }));
          return throwError(err)
        })
      )
      .subscribe(() => {
        this.subscriptionData.update(data => ({
          ...data,
          [field]: !currentData[field]
        }))
        this.showDialog(`Статус обновлен`)
      });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.subscriptionId.set(id)
        this.loadSubscriptionById(id)
      }
    })
  }

  returnBack() {
    this.router.navigate(['/'])
  }

  loadSubscriptionById(id: string) {
    this.subscriptionsService.getSubscription(id).subscribe((data) => {
      const findedData = data[0]
      this.subscriptionData.set(findedData)
      this.isPaidStatusBlock.update(currentData => ({
        ...currentData, 
        isActive: findedData.status
      }))
      this.usedStatusBlock.update(currentData => ({
        ...currentData, 
        isActive: findedData.use_in_this_month
      }))
      
      this.patchFormValues(findedData)
    })
  }

  private patchFormValues(data: SubscriptionInterface): void {
    this.editForm.patchValue({
      name: data.name,
      cost: data.cost,
      next_billing: data.next_billing,
      url_service: data.url_service || '',
      cancellation_link: data.cancellation_link || '',
      category: data.category,
    });
  }

  changeStatus(changingSignal: WritableSignal<StatusBlockInterface>) {
    let value = !changingSignal().isActive
    changingSignal.update(currentData => ({
      ...currentData, 
      isActive: value
    }))
    changingSignal().subject.next(of([value]))
  }

  saveChanges($event: Event) {
    $event.preventDefault()
    
    this.subscriptionsService.updateSubscription(
      this.subscriptionData(), 
      this.editForm.value as SubscriptionInterface)
      .pipe(
        catchError((err) => {
          this.showError(`${err.statusText}: ${err.status}`)
          return throwError(err)
        })
      ).subscribe((data) => {
        this.showDialog('Изменения сохранены')
      }
    )
  }
  
  deleteSubscription($event: Event) {
    $event.preventDefault()
    
    this.subscriptionsService.deleteSubscription(
      this.subscriptionData())
      .pipe(
        catchError((err) => {
          this.showError(`${err.statusText}: ${err.status}`)
          return throwError(err)
        })
      ).subscribe(() => {
        this.router.navigate(['/'])
      }
    )
  }

  protected showDialog(message: string): void {
    this.errorHandler.showAlert(
      `${message}`,
      {
        data: {
          theme: 'dark'
        }
      }
    )
  }

  protected showError(message: string): void {
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