import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataOwnerComponent } from './data-owner.component';

describe('DataOwnerComponent', () => {
  let component: DataOwnerComponent;
  let fixture: ComponentFixture<DataOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataOwnerComponent]
    });
    fixture = TestBed.createComponent(DataOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
