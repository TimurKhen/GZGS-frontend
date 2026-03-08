import { Component, inject, OnInit, signal } from '@angular/core';
import { Navigation } from "../components/navigation/navigation";
import { RouterOutlet } from "@angular/router";
import { UserApiService } from '../../services/api/user-api/user-api-service';
import { DeviceService } from '../../global/services/device-service';
import { MobileNavigation } from "../../components/mobile-navigation/mobile-navigation";

@Component({
  selector: 'app-desktop-handler',
  imports: [Navigation, RouterOutlet, MobileNavigation],
  templateUrl: './desktop-handler.html',
  styleUrl: './desktop-handler.scss',
})
export class DesktopHandler implements OnInit {
  private deviceHandler = inject(DeviceService)
  isMobile = signal<boolean>(false)

  ngOnInit(): void {
    this.deviceHandler.isMobile$.subscribe((val) => {
      this.isMobile.set(val)
    })
  }
}
