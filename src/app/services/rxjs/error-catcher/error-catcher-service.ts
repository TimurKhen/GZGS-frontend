import { inject, Injectable } from '@angular/core';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorCatcherService {
  private readonly alerts = inject(TuiAlertService)

  showAlert(message: string, settings: any): void {
    if (message.includes('{"isTrusted":true}')) {
      message = 'Server offline'
    }

    this.alerts
        .open(
            `${message}`,
            settings
        )
        .subscribe()  
  }
}
