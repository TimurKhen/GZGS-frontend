import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNumberPipe',
})
export class ShortNumberPipe implements PipeTransform {

  transform(value: number | undefined): string {
    if (value === null || value === undefined) return ''

    return new Intl.NumberFormat('ru', {
      notation: 'compact'
    }).format(value)
  }

}
