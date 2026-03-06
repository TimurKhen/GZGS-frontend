import { Component, inject, OnInit, signal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { UserApiService } from '../../../../services/api/user-api/user-api-service';

@Component({
  selector: 'app-profile-page',
  imports: [TuiButton],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
  private userHandler = inject(UserApiService)
  userAvatarUrl = signal<string>('')
  userName = signal<string>('')

  ngOnInit(): void {
    const userData = this.userHandler.userInfo
    userData.subscribe((data) => {
      console.log(data)
      this.userName.set(String(data.user.fullname))
      this.userAvatarUrl.set(String(data.user.avatar_url))
    })
  }
}
