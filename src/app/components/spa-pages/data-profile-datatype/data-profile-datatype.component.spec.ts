import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProfileDatatypeComponent } from './data-profile-datatype.component';

describe('DataProfileDatatypeComponent', () => {
  let component: DataProfileDatatypeComponent;
  let fixture: ComponentFixture<DataProfileDatatypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataProfileDatatypeComponent]
    });
    fixture = TestBed.createComponent(DataProfileDatatypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
