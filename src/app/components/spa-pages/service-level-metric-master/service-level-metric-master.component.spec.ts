import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLevelMetricMasterComponent } from './service-level-metric-master.component';

describe('ServiceLevelMetricMasterComponent', () => {
  let component: ServiceLevelMetricMasterComponent;
  let fixture: ComponentFixture<ServiceLevelMetricMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceLevelMetricMasterComponent]
    });
    fixture = TestBed.createComponent(ServiceLevelMetricMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
