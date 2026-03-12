import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

import { DeleteActivityComponent } from './delete-activity.component';

describe('DeleteActivityComponent', () => {
  let component: DeleteActivityComponent;
  let fixture: ComponentFixture<DeleteActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteActivityComponent],
      providers: [
        {
          provide: FirestoreService,
          useValue: { deleteActivity: () => of(void 0) },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
