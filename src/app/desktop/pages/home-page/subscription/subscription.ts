import { Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { TuiAlertService, TuiIcon } from "@taiga-ui/core";
import { IsPaidStatus } from "../../../../components/is-paid-status/is-paid-status";
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionInterface } from '../../../../interfaces/subscribtions/subscription-interface';
import { StatusBlock } from "../../../components/status-block/status-block";
import { StatusBlockInterface } from '../../../../interfaces/status-block/status-block-interface';
import { ActionButtonInterface } from '../../../../interfaces/action-button/action-button-interface';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-subscription',
  imports: [TuiIcon, IsPaidStatus, DatePipe, StatusBlock],
  templateUrl: './subscription.html',
  styleUrl: './subscription.scss',
})
export class Subscription implements OnInit {
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
            .open('Крутое письмо')
            .subscribe()

        // TODO - копирование письма в clipboard + уведомление через Taiga Alert
      }
    }
  ])
  
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

  parseDate(dateString: string | undefined) {
    if (dateString) {
      return new Date(dateString)
    } else {
      return ''
    }
  }

  changeStatus(changingSignal: WritableSignal<StatusBlockInterface>) {
    changingSignal.update(currentData => ({
      ...currentData, 
      isActive: !currentData.isActive   
    }))
  }
}