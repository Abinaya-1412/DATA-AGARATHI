import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTopicComponent } from './data-topic.component';

describe('DataTopicComponent', () => {
  let component: DataTopicComponent;
  let fixture: ComponentFixture<DataTopicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTopicComponent]
    });
    fixture = TestBed.createComponent(DataTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
