import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProfilePatternComponent } from './data-profile-pattern.component';

describe('DataProfilePatternComponent', () => {
  let component: DataProfilePatternComponent;
  let fixture: ComponentFixture<DataProfilePatternComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataProfilePatternComponent]
    });
    fixture = TestBed.createComponent(DataProfilePatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
