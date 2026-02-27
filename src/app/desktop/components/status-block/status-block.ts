import { Component, input, output } from '@angular/core';
import { StatusBlockInterface } from '../../../interfaces/status-block/status-block-interface';
import { TuiIcon } from "@taiga-ui/core";
import { NgClass } from '@angular/common';

@Component({
  selector: 'status-block',
  imports: [TuiIcon, NgClass],
  templateUrl: './status-block.html',
  styleUrl: './status-block.scss',
})
export class StatusBlock {
  blockData = input<StatusBlockInterface>()

  statusChange = output()

  changeStatus() {
    this.statusChange.emit()
  }
}
