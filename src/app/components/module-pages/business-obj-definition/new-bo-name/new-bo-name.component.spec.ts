import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBONameComponent } from './new-bo-name.component';

describe('NewBONameComponent', () => {
  let component: NewBONameComponent;
  let fixture: ComponentFixture<NewBONameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBONameComponent]
    });
    fixture = TestBed.createComponent(NewBONameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
