import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TuiAlertService, TuiIcon } from "@taiga-ui/core";
import { IsPaidStatus } from "../../../../components/is-paid-status/is-paid-status";
import { DatePipe, JsonPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionInterface } from '../../../../interfaces/subscribtions/subscription-interface';
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


@Component({
  selector: 'app-subscription',
  imports: [TuiIcon, IsPaidStatus, DatePipe, StatusBlock, FileInput, TextInput, DateInput],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss',
})
export class Subscription implements OnInit {
  readonly dateConverter = inject(DateConverter)
  private subscriptionsService = inject(SubscriptionsService)
  private readonly alerts = inject(TuiAlertService)
  
  subscriptionData = signal<any>(null)
  subscriptionId = signal<string | null>(null)
  
  isPaidStatusBlock = signal<StatusBlockInterface>({
    icon: null,
    text: 'Подписка оплачена',
    secondText: 'Подписка не оплачена',
    buttonText: 'Поменять',
    secondButtonText: 'Оплачена',
    isActive: true
  })
  usedStatusBlock = signal<StatusBlockInterface>({
    icon: null,
    text: 'Подписка использована',
    secondText: 'Подписка не использована',
    buttonText: 'Поменять',
    secondButtonText: 'Использована',
    isActive: false
  })

  actionButtons = signal<ActionButtonInterface[]>([
    {
      name: 'Перейти к сервису',
      action: () => {
        const url = this.subscriptionData().url_service
        window.open(url, '_blank')
      }
    },
    {
      name: 'Перейти к отмене подписки',
      action: () => {
        const url = this.subscriptionData().cancellation_link
        window.open(url, '_blank')
      }
    },
    {
      name: 'Скопировать письмо для отмены',
      action: () => {
        this.clipboard.copy('Текст для копирования')

        this.alerts
            .open('<strong>Письмо было скопированно</strong>')
            .subscribe()
      }
    }
  ])
  
  editForm = new FormGroup({
    subscription_avatar_url: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    cost: new FormControl(0, [Validators.required]),
    next_billing: new FormControl('', [Validators.required]),
    url_service: new FormControl(''),
    cancellation_link: new FormControl(''),
    category: new FormControl('', [Validators.required])
  })

  
  constructor(
    private route: ActivatedRoute,
    private clipboard: Clipboard
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.subscriptionId.set(id)
        this.loadSubscriptionById(id)
      }
    })
  }

  loadSubscriptionById(id: string) {
    this.subscriptionsService.userSubscriptions.subscribe((data) => {
      let finded = data.findIndex((value) => {
        return value.subscription_id === id
      }) 
      if (finded === -1) {
        this.subscriptionData.set(null)
      } else {
        this.subscriptionData.set(data[finded])
      }
    })
  }

  changeStatus(changingSignal: WritableSignal<StatusBlockInterface>) {
    changingSignal.update(currentData => ({
      ...currentData, 
      isActive: !currentData.isActive   
    }))
  }

  saveChanges($event: Event) {
    $event.preventDefault()
  }
}