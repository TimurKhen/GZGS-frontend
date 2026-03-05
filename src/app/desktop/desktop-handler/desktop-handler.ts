import { Component, inject, OnInit } from '@angular/core';
import { Navigation } from "../components/navigation/navigation";
import { RouterOutlet } from "@angular/router";
import { UserApiService } from '../../services/api/user-api/user-api-service';

@Component({
  selector: 'app-desktop-handler',
  imports: [Navigation, RouterOutlet],
  templateUrl: './desktop-handler.html',
  styleUrl: './desktop-handler.scss',
})
export class DesktopHandler implements OnInit {
  private userHandler = inject(UserApiService)

  ngOnInit(): void {
    this.userHandler.getUser().subscribe()
  }
}
