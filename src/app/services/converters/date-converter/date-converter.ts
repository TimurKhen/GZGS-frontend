import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateConverter {
  parseDate(dateString: string | undefined) {
    if (dateString) {
      return new Date(dateString)
    } else {
      return ''
    }
  }
}
