import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  formError = '';

  constructor(
    public auth: AuthService,
    @Inject(FormBuilder) private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSignup() {
    if (this.signupForm.invalid) {
      this.formError = 'Please fill in all required fields correctly.';
      this.signupForm.markAllAsTouched();
      return;
    }

    this.formError = '';
    const { email, password } = this.signupForm.value;

    try {
      await this.auth.signup(email, password);
      if (this.auth.isloggedIn) {
        this.router.navigate(['/dashboard']);
      } else {
        this.formError = 'Unable to sign up. Please try again.';
      }
    } catch (error) {
      this.formError =
        error instanceof Error ? error.message : 'Sign-up failed';
    }
  }
}
