import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserApiService } from '../../../../services/api/user-api/user-api-service';
import { LoginUserInterface } from '../../../../interfaces/user/login-user-interface';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  userAPIservice = inject(UserApiService)
  isLoading = signal<boolean>(false)

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private router: Router) {}

  signIn($event: Event) {
    $event.preventDefault()
    this.enterAccount()
  }

  enterAccount() {
    const values = this.signInForm.value

    const loginObject: LoginUserInterface = {
      email: String(values.email),
      password: String(values.password)
    }

    this.isLoading.set(true)
    
    this.userAPIservice.login(loginObject)
    .pipe(
      catchError((err) => {
        this.isLoading.set(false)
        return throwError(err)
      })
    ).subscribe((data) => {
      this.isLoading.set(false)
      this.router.navigate(['/'])
    })
  }
}
