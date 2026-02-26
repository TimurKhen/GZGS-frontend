import { Component } from '@angular/core';
import { TuiIcon } from "@taiga-ui/core";
import { IsPaidStatus } from "../../../components/is-paid-status/is-paid-status";

@Component({
  selector: 'app-subscriptions-page',
  imports: [TuiIcon, IsPaidStatus],
  templateUrl: './subscriptions-page.html',
  styleUrl: './subscriptions-page.scss',
})
export class SubscriptionsPage {

}
