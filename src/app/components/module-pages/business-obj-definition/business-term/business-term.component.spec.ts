import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessTermComponent } from './business-term.component';

describe('BusinessTermComponent', () => {
  let component: BusinessTermComponent;
  let fixture: ComponentFixture<BusinessTermComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessTermComponent]
    });
    fixture = TestBed.createComponent(BusinessTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
