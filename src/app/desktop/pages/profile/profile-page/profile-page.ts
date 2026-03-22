import { Component, effect, inject, OnChanges, OnDestroy, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { TuiButton } from '@taiga-ui/core';
import { UserApiService } from '../../../../services/api/user-api/user-api-service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { StatusBlockInterface } from '../../../../interfaces/status-block/status-block-interface';
import { debounceTime, of, Subject, switchMap } from 'rxjs';
import { StatusBlock } from "../../../components/status-block/status-block";
import { ErrorCatcherService } from '../../../../services/rxjs/error-catcher/error-catcher-service';

@Component({
  selector: 'app-profile-page',
  imports: [TuiButton, StatusBlock, ReactiveFormsModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
  private userHandler = inject(UserApiService)
  private errorHandler = inject(ErrorCatcherService)

  userData = signal<any>(null)
  userAvatarUrl = signal<string>('')
  userName = signal<string>('')
  notificationStatus = signal<boolean>(false)
  isUpdating = signal<boolean>(false)

  notificationsSubject = new Subject()

  editUserForm = new FormGroup({
    name: new FormControl(this.userName(), [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    notifications: new FormControl()
  })

  constructor() {
    effect(() => {
      this.notificationsSubject
        .pipe(
          debounceTime(250),
          switchMap((val: any) => {
            return val
          })
        )
        .subscribe((data) => {
          if (data) {
            this.updateUserNotificationsStatus(data)
          }
        }
      )
    })
  }

  notificationBlock = signal<StatusBlockInterface>({
    icon: 'bell',
    text: 'Уведомления включены',
    secondText: 'Уведомления отключены',
    buttonText: 'Отключить',
    secondButtonText: 'Включить',
    isActive: this.notificationStatus(),
    subject: this.notificationsSubject,
  })

  changeStatus(changingSignal: WritableSignal<StatusBlockInterface>) {
    let value = !changingSignal().isActive
    changingSignal.update(currentData => ({
      ...currentData,
      isActive: value
    }))
    changingSignal().subject.next(of([value]))
  }

  ngOnInit(): void {
    this.userHandler.getUser()
      .subscribe((data) => {
        if (data) {
          this.userName.set(String(data.user.fullname))
          this.userAvatarUrl.set(String(data.user.avatar_url))
          this.notificationStatus.set(data.user.notifications)
          this.userData.set(data.user)
          this.notificationBlock.update((val) => ({
            ...val,
            isActive: this.notificationStatus()
          }))
        }
      })
  }

  showError(message: string): void {
    this.errorHandler.showAlert(
      `${message}`,
      {
        data: {
          theme: 'dark'
        }
      }
    )
  }

  updateUserNotificationsStatus(type: any) {
    const currentType = type[0]
    this.isUpdating.set(true)
    if (this.notificationStatus() !== currentType) {
      this.notificationStatus.set(currentType)
      this.userHandler.updateUser(this.userData, {notifications: currentType})
      .subscribe((data) => {
        this.showError('Успешно изменено.')
      })
    }
  }

  logout() {
    this.userHandler.logout()
  }
}
