import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {
  isSignedIn = false;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('user') !== null)
      this.isSignedIn = true;
    else
      this.isSignedIn = false;
  }

  async onSignup(email: string, password: string) {
    await this.auth.signup(email, password)
    if (this.auth.isloggedIn)
      this.isSignedIn = true;
    else
      this.isSignedIn = false;
  }

}
