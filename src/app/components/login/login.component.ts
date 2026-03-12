import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formError = '';

  constructor(
    public auth: AuthService,
    @Inject(FormBuilder) private fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.formError = 'Please complete required fields correctly.';
      this.loginForm.markAllAsTouched();
      return;
    }

    this.formError = '';
    const { email, password } = this.loginForm.value;

    try {
      await this.auth.login(email, password);
      if (this.auth.isloggedIn) {
        this.router.navigate(['/dashboard']);
      } else {
        this.formError = 'Invalid email/password or user does not exist.';
      }
    } catch (error) {
      this.formError = error instanceof Error ? error.message : 'Login failed';
    }
  }
}
