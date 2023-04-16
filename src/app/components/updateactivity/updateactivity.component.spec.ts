import { ComponentFixture, TestBed } from '@angular/core/testing';

import { updateactivityComponent } from './updateactivity.component';

describe('updateactivityComponent', () => {
  let component: updateactivityComponent;
  let fixture: ComponentFixture<updateactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [updateactivityComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(updateactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
