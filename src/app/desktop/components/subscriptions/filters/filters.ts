import {NgForOf} from '@angular/common';
import {ChangeDetectionStrategy, Component, input, OnInit, output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TUI_FALSE_HANDLER} from '@taiga-ui/cdk';
import {TuiChip} from '@taiga-ui/kit';
import {TuiItemGroup} from '@taiga-ui/layout';
import { debounceTime, Subject, switchMap } from 'rxjs';
 
@Component({
  selector: 'filters',
  imports: [FormsModule, NgForOf, TuiChip, TuiItemGroup],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',

})
export class Filters implements OnInit {
  changedFilters = output<boolean[]>()
  filters = input<string[]>([])
  isMultiple = input<boolean>(false)

  checked: any
  private changedCheckedFilters = new Subject<void>()
  
  ngOnInit(): void {
    if (this.isMultiple()) {
      this.checked = this.filters().map(TUI_FALSE_HANDLER)
    } else {
      this.checked = this.filters()[0]
    }
  }

  constructor() {
    this.changedCheckedFilters.pipe(
      debounceTime(300),
      switchMap(() => {
        this.changedFilters.emit(this.checked)
        return this.checked
      })
    ).subscribe()
  }

  changeFilters() {
    this.changedCheckedFilters.next()
  }
}
