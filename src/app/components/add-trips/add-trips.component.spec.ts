import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { AddTripsComponent } from './add-trips.component';

describe('AddTripsComponent', () => {
  let component: AddTripsComponent;
  let fixture: ComponentFixture<AddTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddTripsComponent],
      providers: [
        {
          provide: FirestoreService,
          useValue: {
            addTrips: () => of(void 0),
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

    fixture = TestBed.createComponent(AddTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
