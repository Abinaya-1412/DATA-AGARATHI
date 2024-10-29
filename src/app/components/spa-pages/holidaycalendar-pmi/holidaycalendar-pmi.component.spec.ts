import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidaycalendarPmiComponent } from './holidaycalendar-pmi.component';

describe('HolidaycalendarPmiComponent', () => {
  let component: HolidaycalendarPmiComponent;
  let fixture: ComponentFixture<HolidaycalendarPmiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HolidaycalendarPmiComponent]
    });
    fixture = TestBed.createComponent(HolidaycalendarPmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
