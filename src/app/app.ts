import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { DesktopHandler } from "./desktop/desktop-handler/desktop-handler";

@Component({
  selector: 'app-root',
  imports: [TuiRoot, DesktopHandler],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
