import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isloggedIn = false;

  constructor(public auth: AngularFireAuth) {}

  private readonly demoUser = {
    email: 'test@holidayguru.com',
    password: 'Test@2026',
    uid: 'demo-user-uid',
  };

  private isDemoCredentials(email: string, password: string): boolean {
    return (
      email.toLowerCase() === this.demoUser.email.toLowerCase() &&
      password === this.demoUser.password
    );
  }

  async login(email: string, password: string): Promise<void> {
    try {
      if (this.isDemoCredentials(email, password)) {
        this.isloggedIn = true;
        localStorage.setItem(
          'user',
          JSON.stringify({ email, uid: this.demoUser.uid }),
        );
        localStorage.setItem('userId', this.demoUser.uid);
        return;
      }

      await this.auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          this.isloggedIn = true;
          if (res.user) {
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('userId', res.user.uid);
          }
        })
        .catch((error) => {
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
      if (this.isDemoCredentials(email, password)) {
        this.isloggedIn = true;
        localStorage.setItem(
          'user',
          JSON.stringify({ email, uid: this.demoUser.uid }),
        );
        localStorage.setItem('userId', this.demoUser.uid);
        return;
      }

      await this.auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          this.isloggedIn = true;
          if (res.user) {
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('userId', res.user.uid);
          }
        })
        .catch((error) => {
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
    localStorage.removeItem('user');
    await this.auth.signOut();
    this.isloggedIn = false;
  }
}
