import { Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiIcon, TuiLoader } from "@taiga-ui/core";
import { UserApiService } from '../../../../../../services/api/user-api/user-api-service';
import { catchError, debounceTime, delay, throwError } from 'rxjs';

@Component({
  selector: 'assets-add-email',
  imports: [ReactiveFormsModule, TuiIcon, TuiLoader],
  templateUrl: './add-email.html',
  styleUrl: './add-email.scss',
})
export class AddEmail {
  userService = inject(UserApiService)

  isRegistratedInput = input<boolean>(false)
  isRegistrated = signal<boolean>(this.isRegistratedInput())
  isEmailLoading = signal<boolean>(false)

  emailForm = new FormGroup({
    password: new FormControl('', [Validators.required])
  })

  addEmail($event: Event) {
    $event.preventDefault()
    this.isEmailLoading.set(true)
    const passwordValue = this.emailForm.get('password')?.value
    this.userService.connectEmail(String(passwordValue))
      .pipe(
        catchError((err) => {
          this.isEmailLoading.set(false)
          return throwError(err)
        })
      )
    .subscribe((data) => {
        console.log(data)
        this.isEmailLoading.set(false)
        this.isRegistrated.set(true)
      })
  }
}
