import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserApiService } from '../../../../services/api/user-api/user-api-service';
import { LoginUserInterface } from '../../../../interfaces/user/login-user-interface';

@Component({
  selector: 'app-sign-in',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  userAPIservice = inject(UserApiService)

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

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

    this.userAPIservice.login(loginObject).subscribe((data) => {
      console.log(data)
    })
  }
}
