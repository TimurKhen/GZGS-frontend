import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

const urls = [
  {
    name: 'Главная',
    address: '/'
  },
  {
    name: 'Подписки',
    address: '/subscriptions'
  },
  {
    name: 'Аналитика',
    address: '/analytics'
  }
]

@Component({
  selector: 'navigation',
  imports: [RouterLink, NgClass],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
})
export class Navigation {
  private router = inject(Router)
  
  activePageIndex = signal<number>(0)
  
  public paths = urls
  
  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.url

      const findedIndex = urls.findIndex((val) => {
        return val.address == url
      })

      if (findedIndex !== -1) {
        this.activePageIndex.set(findedIndex)
      }

    })
  }

}
