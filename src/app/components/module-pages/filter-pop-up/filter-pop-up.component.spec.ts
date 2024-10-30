import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPopUpComponent } from './filter-pop-up.component';

describe('FilterPopUpComponent', () => {
  let component: FilterPopUpComponent;
  let fixture: ComponentFixture<FilterPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterPopUpComponent]
    });
    fixture = TestBed.createComponent(FilterPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
