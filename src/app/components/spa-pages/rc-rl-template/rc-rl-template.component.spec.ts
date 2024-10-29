import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcRlTemplateComponent } from './rc-rl-template.component';

describe('RcRlTemplateComponent', () => {
  let component: RcRlTemplateComponent;
  let fixture: ComponentFixture<RcRlTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RcRlTemplateComponent]
    });
    fixture = TestBed.createComponent(RcRlTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
