import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isloggedIn: boolean;
  router: Router;
  constructor(public auth: AngularFireAuth) {
    this.isloggedIn = false;
  }


  async login(email: string, password: string): Promise<void> {

    try {

      await this.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          this.isloggedIn = true;
          if (res.user) {
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('userId', res.user.uid);
          }
        })

        .catch(error => {
          throw new Error(`Login failed: ${error.message}`);
        });
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
      } else {
        window.alert('An unknown error occurred.');
      }
      this.isloggedIn = false;
    }
  }



  async signup(email: string, password: string): Promise<void> {
    try {
      await this.auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          this.isloggedIn = true;
          if (res.user) {
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('userId', res.user.uid);
          }
        })
        .catch(error => {
          throw new Error(`Sign Up failed: ${error.message}`);
        });
    } catch (error) {
      if (error instanceof Error) {
        window.alert(error.message);
      } else {
        window.alert('An unknown error occurred.');
      }
      this.isloggedIn = false;
    }
  }


  async logout(): Promise<void> {
    localStorage.removeItem('userId');
    this.auth.signOut;
    this.isloggedIn = false;

  }

}