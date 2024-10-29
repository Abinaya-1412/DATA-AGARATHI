import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLevelMetricComponent } from './service-level-metric.component';

describe('ServiceLevelMetricComponent', () => {
  let component: ServiceLevelMetricComponent;
  let fixture: ComponentFixture<ServiceLevelMetricComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceLevelMetricComponent]
    });
    fixture = TestBed.createComponent(ServiceLevelMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
