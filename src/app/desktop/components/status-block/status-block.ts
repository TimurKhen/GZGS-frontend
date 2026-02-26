import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-block',
  imports: [],
  templateUrl: './status-block.html',
  styleUrl: './status-block.scss',
})
export class StatusBlock {
  icon = input<string>()
}
