import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.user.email, this.user.password);
  }
}
