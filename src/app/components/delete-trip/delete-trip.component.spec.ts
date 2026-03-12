import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

import { DeleteTripComponent } from './delete-trip.component';

describe('DeleteTripComponent', () => {
  let component: DeleteTripComponent;
  let fixture: ComponentFixture<DeleteTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteTripComponent],
      providers: [
        {
          provide: FirestoreService,
          useValue: { deleteTrip: () => of(void 0) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
