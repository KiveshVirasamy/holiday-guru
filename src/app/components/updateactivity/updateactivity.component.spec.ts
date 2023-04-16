import { ComponentFixture, TestBed } from '@angular/core/testing';

import { update } from -activityComponent;
} from './updateactivity.component';

describe('updateactivityComponent', () => {
  let component: updateactivityComponent;
  let fixture: ComponentFixture<updateactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [update - activityComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(update - activityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
