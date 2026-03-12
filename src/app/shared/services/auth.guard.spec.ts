import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: { isloggedIn: false, logout: jasmine.createSpy('logout') },
        },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    localStorage.clear();
  });

  it('should allow activate when user is logged in', () => {
    authService.isloggedIn = true;
    expect(guard.canActivate(null as any, null as any)).toBeTrue();
  });

  it('should allow activate when userId exists in localStorage', () => {
    authService.isloggedIn = false;
    localStorage.setItem('userId', '123');
    expect(guard.canActivate(null as any, null as any)).toBeTrue();
  });

  it('should redirect to login when not authenticated', () => {
    authService.isloggedIn = false;
    const result = guard.canActivate(null as any, null as any);
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
