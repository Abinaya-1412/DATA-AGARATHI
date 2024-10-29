import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsheetDetailComponent } from './factsheet-detail.component';

describe('FactsheetDetailComponent', () => {
  let component: FactsheetDetailComponent;
  let fixture: ComponentFixture<FactsheetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactsheetDetailComponent]
    });
    fixture = TestBed.createComponent(FactsheetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
