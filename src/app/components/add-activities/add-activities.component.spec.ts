import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { AddActivitiesComponent } from './add-activities.component';

describe('AddActivitiesComponent', () => {
  let component: AddActivitiesComponent;
  let fixture: ComponentFixture<AddActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddActivitiesComponent],
      providers: [
        {
          provide: FirestoreService,
          useValue: {
            addActivities: () => of(void 0),
            generateRandomString: () => 'id',
          },
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
        {
          provide: Store,
          useValue: { dispatch: jasmine.createSpy('dispatch') },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AddActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
