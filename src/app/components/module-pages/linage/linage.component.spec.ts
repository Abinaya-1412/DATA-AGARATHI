import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinageComponent } from './linage.component';

describe('LinageComponent', () => {
  let component: LinageComponent;
  let fixture: ComponentFixture<LinageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinageComponent]
    });
    fixture = TestBed.createComponent(LinageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
