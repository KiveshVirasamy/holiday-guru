import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MockAuthService {
  isloggedIn = false;

  login(email: string, password: string): Promise<void> {
    if (email === 'test@holidayguru.com' && password === 'Test@2026') {
      this.isloggedIn = true;
      localStorage.setItem('userId', 'demo-user-uid');
      localStorage.setItem(
        'user',
        JSON.stringify({ email, uid: 'demo-user-uid' }),
      );
      return Promise.resolve();
    }
    return Promise.reject(new Error('Mock credentials are invalid'));
  }

  signup(email: string, password: string): Promise<void> {
    if (email && password.length >= 6) {
      this.isloggedIn = true;
      localStorage.setItem('userId', 'demo-user-uid');
      localStorage.setItem(
        'user',
        JSON.stringify({ email, uid: 'demo-user-uid' }),
      );
      return Promise.resolve();
    }
    return Promise.reject(new Error('Mock signup failed'));
  }

  logout(): Promise<void> {
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    this.isloggedIn = false;
    return Promise.resolve();
  }
}
