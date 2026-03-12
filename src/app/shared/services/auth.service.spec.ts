import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let authSpy: jasmine.SpyObj<AngularFireAuth>;

  beforeEach(() => {
    authSpy = jasmine.createSpyObj('AngularFireAuth', [
      'signInWithEmailAndPassword',
      'createUserWithEmailAndPassword',
      'signOut',
    ]);
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFireAuth, useValue: authSpy }],
    });
    service = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and set userId', async () => {
    authSpy.signInWithEmailAndPassword.and.returnValue(
      Promise.resolve({
        user: { uid: '123', email: 'user@example.com' },
        credential: null,
      } as any),
    );
    await service.login('user@example.com', 'password');
    expect(service.isloggedIn).toBeTrue();
    expect(localStorage.getItem('userId')).toBe('123');
  });

  it('should signup and set userId', async () => {
    authSpy.createUserWithEmailAndPassword.and.returnValue(
      Promise.resolve({
        user: { uid: '456', email: 'new@example.com' },
        credential: null,
      } as any),
    );
    await service.signup('new@example.com', 'password');
    expect(service.isloggedIn).toBeTrue();
    expect(localStorage.getItem('userId')).toBe('456');
  });

  it('should logout and clear state', async () => {
    localStorage.setItem('userId', '123');
    authSpy.signOut.and.returnValue(Promise.resolve());
    service.isloggedIn = true;

    await service.logout();

    expect(service.isloggedIn).toBeFalse();
    expect(localStorage.getItem('userId')).toBeNull();
    expect(authSpy.signOut).toHaveBeenCalled();
  });
});
