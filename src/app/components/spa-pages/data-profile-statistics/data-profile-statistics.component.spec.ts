import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProfileStatisticsComponent } from './data-profile-statistics.component';

describe('DataProfileStatisticsComponent', () => {
  let component: DataProfileStatisticsComponent;
  let fixture: ComponentFixture<DataProfileStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataProfileStatisticsComponent]
    });
    fixture = TestBed.createComponent(DataProfileStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
