import { NgClass } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { UserApiService } from '../../../services/api/user-api/user-api-service';

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
export class Navigation implements OnInit {
  private router = inject(Router)
  private userHandler = inject(UserApiService)
  
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
    } else {
      if (url.includes('profile')) {
        this.activePageIndex.set(4) 
      }
    }
  }
}
