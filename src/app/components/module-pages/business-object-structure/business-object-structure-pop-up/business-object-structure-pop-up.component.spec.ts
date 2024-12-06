import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessObjectStructurePopUpComponent } from './business-object-structure-pop-up.component';

describe('BusinessObjectStructurePopUpComponent', () => {
  let component: BusinessObjectStructurePopUpComponent;
  let fixture: ComponentFixture<BusinessObjectStructurePopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessObjectStructurePopUpComponent]
    });
    fixture = TestBed.createComponent(BusinessObjectStructurePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
