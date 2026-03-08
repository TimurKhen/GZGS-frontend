import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

const urls = [
  {
    icon: 'главная',
    address: '/'
  },
  {
    icon: 'подписки',
    address: '/subscriptions'
  },
  {
    icon: 'аналитика',
    address: '/analytics'
  },
  {
    icon: 'профиль',
    address: '/profile'
  }
]


@Component({
  selector: 'mobile-navigation',
  imports: [RouterLink, NgClass],
  templateUrl: './mobile-navigation.html',
  styleUrl: './mobile-navigation.scss',
})
export class MobileNavigation {
  private router = inject(Router)
  
  activePageIndex = signal<number>(0)
  userName = signal<string>('Вы')
  
  public paths = urls
  
  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateActivePage(event.url)
    })
  }

  ngOnInit() {
    const currentUrl = this.router.url
    this.updateActivePage(currentUrl)    
  }

  private updateActivePage(url: string) {
    const findedIndex = urls.findIndex((val) => {
      return val.address == url
    })
    if (findedIndex !== -1) {
      this.activePageIndex.set(findedIndex)
    }
  }
}
