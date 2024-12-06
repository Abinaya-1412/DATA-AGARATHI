import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinagePopUpComponent } from './linage-pop-up.component';

describe('LinagePopUpComponent', () => {
  let component: LinagePopUpComponent;
  let fixture: ComponentFixture<LinagePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinagePopUpComponent]
    });
    fixture = TestBed.createComponent(LinagePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
