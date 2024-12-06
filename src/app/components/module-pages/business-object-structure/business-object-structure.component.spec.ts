import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessObjectStructureComponent } from './business-object-structure.component';

describe('BusinessObjectStructureComponent', () => {
  let component: BusinessObjectStructureComponent;
  let fixture: ComponentFixture<BusinessObjectStructureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessObjectStructureComponent]
    });
    fixture = TestBed.createComponent(BusinessObjectStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
