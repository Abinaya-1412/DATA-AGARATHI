import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpleDataComponent } from './imple-data.component';

describe('ImpleDataComponent', () => {
  let component: ImpleDataComponent;
  let fixture: ComponentFixture<ImpleDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImpleDataComponent]
    });
    fixture = TestBed.createComponent(ImpleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
