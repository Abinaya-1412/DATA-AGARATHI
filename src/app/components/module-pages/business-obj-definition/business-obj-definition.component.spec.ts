import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessObjDefinitionComponent } from './business-obj-definition.component';

describe('BusinessObjDefinitionComponent', () => {
  let component: BusinessObjDefinitionComponent;
  let fixture: ComponentFixture<BusinessObjDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusinessObjDefinitionComponent]
    });
    fixture = TestBed.createComponent(BusinessObjDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
