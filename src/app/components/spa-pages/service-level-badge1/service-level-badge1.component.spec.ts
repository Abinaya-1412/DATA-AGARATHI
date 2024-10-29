import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLevelBadge1Component } from './service-level-badge1.component';

describe('ServiceLevelBadge1Component', () => {
  let component: ServiceLevelBadge1Component;
  let fixture: ComponentFixture<ServiceLevelBadge1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceLevelBadge1Component]
    });
    fixture = TestBed.createComponent(ServiceLevelBadge1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
