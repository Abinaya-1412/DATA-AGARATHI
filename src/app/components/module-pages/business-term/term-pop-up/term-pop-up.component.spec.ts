import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermPopUpComponent } from './term-pop-up.component';

describe('TermPopUpComponent', () => {
  let component: TermPopUpComponent;
  let fixture: ComponentFixture<TermPopUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TermPopUpComponent]
    });
    fixture = TestBed.createComponent(TermPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
