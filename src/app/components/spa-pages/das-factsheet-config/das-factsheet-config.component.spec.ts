import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasFactsheetConfigComponent } from './das-factsheet-config.component';

describe('DasFactsheetConfigComponent', () => {
  let component: DasFactsheetConfigComponent;
  let fixture: ComponentFixture<DasFactsheetConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DasFactsheetConfigComponent]
    });
    fixture = TestBed.createComponent(DasFactsheetConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
