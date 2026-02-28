import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [NgIf, ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  signIn($event: Event) {
    $event.preventDefault()
    this.enterAccount()
  }

  enterAccount() {
    console.log(this.signInForm.value)
  }
}
