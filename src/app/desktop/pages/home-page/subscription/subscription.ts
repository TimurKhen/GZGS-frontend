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


@Component({
  selector: 'app-subscription',
  imports: [TuiIcon, IsPaidStatus, DatePipe, StatusBlock, FileInput, TextInput, DateInput],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss',
})
export class Subscription implements OnInit {
  readonly dateConverter = inject(DateConverter)
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
  notificationsStatusBlock = signal<StatusBlockInterface>({
    icon: 'bell',
    text: 'Уведомления включены',
    secondText: 'Уведомления отключены',
    buttonText: 'Отключить',
    secondButtonText: 'Включить',
    isActive: false
  })
  usedStatusBlock = signal<StatusBlockInterface>({
    icon: null,
    text: 'Подписка использована',
    secondText: 'Подписка не использована',
    buttonText: 'Поменять',
    secondButtonText: 'Использована',
    isActive: false
  })
  
  // TODO ^^^^^^^^^^^^^^^^^^^^^^^
  //  Сделать это как массив лучше будет!!!!!!!!!!!

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
        this.subscriptionData.set(this.loadSubscriptionById(id))
      }
    })
  }

  loadSubscriptionById(id: string): SubscriptionInterface {
    return {
      name: 'Яндекс плюс',
      subscription_avatar_url: 'https://logo-teka.com/wp-content/uploads/2026/02/yandex-plus-icon-logo.png',
      isPaid: true,
      cost: 300,
      next_billind: '2025-05-26',
      category: 'Технологии',
      url_service: 'https://plus.yandex.ru/',
      cancellation_link: 'https://www.gosuslugi.ru/',
      use_in_this_month: false,
      subscription_id: '1'
    }
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