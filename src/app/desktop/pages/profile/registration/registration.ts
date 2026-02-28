import { Component } from '@angular/core';
import { FileInput } from "../../../components/form/inputs/file-input/file-input";
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { TextInput } from "../../../components/form/inputs/text-input/text-input";
import { NgIf } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-registration',
  imports: [NgIf, FileInput, ɵInternalFormsSharedModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
})
export class Registration {
  registrationForm = new FormGroup({
    user_avatar_url: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  registrate($event: Event) {
    $event.preventDefault()
    this.registration()
  }

  registration() {
    console.log(this.registrationForm.value)
  }
}