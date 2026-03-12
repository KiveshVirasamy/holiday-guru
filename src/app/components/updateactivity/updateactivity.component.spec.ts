import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

import { updateactivityComponent } from './updateactivity.component';

describe('updateactivityComponent', () => {
  let component: updateactivityComponent;
  let fixture: ComponentFixture<updateactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [updateactivityComponent],
      providers: [
        {
          provide: FirestoreService,
          useValue: {
            getActivities: () => of([]),
            updateActivities: () => of(void 0),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(updateactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
