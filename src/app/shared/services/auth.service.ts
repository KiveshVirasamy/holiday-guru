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
            console.log(localStorage.getItem('userId'));


          }
        })
    } catch (error) {
      console.log('Error logging in:', error);
      this.isloggedIn = true;
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
            console.log(localStorage.getItem('userId'));

          }
        })
    } catch (error) {
      console.log('Error logging in:', error);
      this.isloggedIn = false;
    }
  }

  async logout(): Promise<void> {
    this.auth.signOut;
    this.isloggedIn = false;

  }

  getUserId(): string {

    return localStorage.getItem('userId') ?? '';
  }









}