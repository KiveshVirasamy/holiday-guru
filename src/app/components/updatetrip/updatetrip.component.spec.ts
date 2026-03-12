import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

import { UpdatetripComponent } from './updatetrip.component';

describe('UpdatetripComponent', () => {
  let component: UpdatetripComponent;
  let fixture: ComponentFixture<UpdatetripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatetripComponent],
      providers: [
        {
          provide: FirestoreService,
          useValue: { getTrips: () => of([]), updateTrip: () => of(void 0) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatetripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
