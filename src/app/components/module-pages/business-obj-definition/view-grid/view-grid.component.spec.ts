import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGridComponent } from './view-grid.component';

describe('ViewGridComponent', () => {
  let component: ViewGridComponent;
  let fixture: ComponentFixture<ViewGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewGridComponent]
    });
    fixture = TestBed.createComponent(ViewGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
