import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MockAuthService } from 'src/app/shared/services/mock-auth.service';
import { SignUpComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignUpComponent],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign up with demo credentials', async () => {
    component.signupForm.setValue({
      email: 'test@holidayguru.com',
      password: 'Test@2026',
    });

    const authService = TestBed.inject(AuthService);
    await component.onSignup();
    expect(authService.isloggedIn).toBeTrue();
    expect(localStorage.getItem('userId')).toBe('demo-user-uid');
  });
});
