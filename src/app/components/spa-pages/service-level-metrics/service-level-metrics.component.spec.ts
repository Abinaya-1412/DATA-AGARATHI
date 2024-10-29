import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLevelMetricsComponent } from './service-level-metrics.component';

describe('ServiceLevelMetricsComponent', () => {
  let component: ServiceLevelMetricsComponent;
  let fixture: ComponentFixture<ServiceLevelMetricsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceLevelMetricsComponent]
    });
    fixture = TestBed.createComponent(ServiceLevelMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
