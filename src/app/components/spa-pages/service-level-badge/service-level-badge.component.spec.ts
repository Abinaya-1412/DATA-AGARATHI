import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLevelBadgeComponent } from './service-level-badge.component';

describe('ServiceLevelBadgeComponent', () => {
  let component: ServiceLevelBadgeComponent;
  let fixture: ComponentFixture<ServiceLevelBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceLevelBadgeComponent]
    });
    fixture = TestBed.createComponent(ServiceLevelBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
