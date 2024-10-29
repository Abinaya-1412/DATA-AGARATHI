import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProfileValuesComponent } from './data-profile-values.component';

describe('DataProfileValuesComponent', () => {
  let component: DataProfileValuesComponent;
  let fixture: ComponentFixture<DataProfileValuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataProfileValuesComponent]
    });
    fixture = TestBed.createComponent(DataProfileValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
