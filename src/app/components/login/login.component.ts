
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  isSignedIn = false;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== null)
      this.isSignedIn = true;
    else
      this.isSignedIn = false;
  }

  async onLogin(email: string, password: string) {
    await this.auth.login(email, password)
    if (this.auth.isloggedIn)
      this.isSignedIn = true;
    else
      this.isSignedIn = false;
  }
}
