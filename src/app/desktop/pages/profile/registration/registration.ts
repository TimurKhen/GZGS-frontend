import { Component, inject, signal } from '@angular/core';
import { FileInput } from "../../../components/form/inputs/file-input/file-input";
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { TextInput } from "../../../components/form/inputs/text-input/text-input";
import { NgIf } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { UserApiService } from '../../../../services/api/user-api/user-api-service';
import { UserInterface } from '../../../../interfaces/user/user-interface';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registration',
  imports: [NgIf, FileInput, ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
})
export class Registration {
  userService = inject(UserApiService)

  registrationForm = new FormGroup({
    user_avatar_url: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  isLoading = signal<boolean>(false)
  file: File | null = null

  constructor(private router: Router) {}

  setFile($event: File) {
    this.file = $event
  }

  registrate($event: Event) {
    $event.preventDefault()
    this.registration()
  }

  registration() {
    const values = this.registrationForm.value
    if (values && this.file) {
      this.isLoading.set(true)
      const apiObject: UserInterface = {
        'id': '',
        'avatar': this.file,
        'fullname': String(values.name) + ' ' + String(values.surname),
        'username': String(values.username),
        'email': String(values.email),
        'password': String(values.password)
      }

      this.userService.registration(apiObject).subscribe({
        next: (data) => {
          this.isLoading.set(false)
          this.router.navigate(['/'])
        },
        error: (error) => {
          console.error(error)
          this.isLoading.set(false)
        }
      })
    }
  }
}