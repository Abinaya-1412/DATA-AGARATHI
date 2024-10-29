import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsheetMasterComponent } from './factsheet-master.component';

describe('FactsheetMasterComponent', () => {
  let component: FactsheetMasterComponent;
  let fixture: ComponentFixture<FactsheetMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactsheetMasterComponent]
    });
    fixture = TestBed.createComponent(FactsheetMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
