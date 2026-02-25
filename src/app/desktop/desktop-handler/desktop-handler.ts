import { Component } from '@angular/core';
import { Navigation } from "../components/navigation/navigation";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-desktop-handler',
  imports: [Navigation, RouterOutlet],
  templateUrl: './desktop-handler.html',
  styleUrl: './desktop-handler.scss',
})
export class DesktopHandler {

}
