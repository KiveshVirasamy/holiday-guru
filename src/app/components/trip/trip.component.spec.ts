import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { MockFirestoreService } from 'src/app/shared/services/mock-firestore.service';
import { TripComponent } from './trip.component';

describe('TripComponent', () => {
  let component: TripComponent;
  let fixture: ComponentFixture<TripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripComponent],
      providers: [
        provideMockStore({
          initialState: {
            trips: {
              trips: [],
              loading: false,
              error: null,
            },
          },
        }),
        { provide: FirestoreService, useClass: MockFirestoreService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
