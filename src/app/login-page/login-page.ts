import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '@angular/common';

const passwordMatchValidator: ValidatorFn = (group: AbstractControl) => {
  const password = group.get('password');
  const passwordConfirm = group.get('passwordConfirm');

  if (!password || !passwordConfirm) return null;
  if (passwordConfirm.errors && !passwordConfirm.errors['passwordMismatch']) return null;

  if (password.value !== passwordConfirm.value) {
    passwordConfirm.setErrors({ passwordMismatch: true });
  } else {
    const errors = { ...passwordConfirm.errors };
    if (errors) delete errors['passwordMismatch'];

    passwordConfirm.setErrors(Object.keys(errors || {}).length ? errors : null);
  }

  return null;
};

@Component({
  selector: 'app-login-page',
  imports: [FontAwesomeModule, ReactiveFormsModule, NgClass],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  faLogin = faRightToBracket;

  fb = new FormBuilder();
  loginForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)]],
      postalCode: ['', [Validators.required, Validators.minLength(3)]],
    },
    { validators: passwordMatchValidator }
  );

  get invalidUsername() {
    return (
      this.loginForm.get('username')?.invalid &&
      (this.loginForm.get('username')?.touched || this.loginForm.get('username')?.dirty)
    );
  }
  get invalidEmail() {
    return (
      this.loginForm.get('email')?.invalid &&
      (this.loginForm.get('email')?.touched || this.loginForm.get('email')?.dirty)
    );
  }

  get invalidPassword() {
    return (
      this.loginForm.get('password')?.invalid &&
      (this.loginForm.get('password')?.touched || this.loginForm.get('password')?.dirty)
    );
  }
  get invalidPasswordConfirm() {
    return (
      (this.loginForm.get('passwordConfirm')?.invalid ||
        this.loginForm.get('passwordConfirm')?.errors?.['passwordMismatch']) &&
      (this.loginForm.get('passwordConfirm')?.touched ||
        this.loginForm.get('passwordConfirm')?.dirty)
    );
  }

  get invalidPostalCode() {
    return (
      this.loginForm.get('postalCode')?.invalid &&
      (this.loginForm.get('postalCode')?.touched || this.loginForm.get('postalCode')?.dirty)
    );
  }
}
