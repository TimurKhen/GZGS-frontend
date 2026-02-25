import { inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable, distinctUntilChanged, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private breakpointObserver = inject(BreakpointObserver);
  
  isMobile$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
    .pipe(
      map(result => result.matches),
      distinctUntilChanged(),
      shareReplay(1)
    );

  getIsMobile(): boolean {
    console.log(window.innerWidth)
    return window.innerWidth <= 768
  }
}
