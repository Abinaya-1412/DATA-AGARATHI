import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictionRuleMgmtComponent } from './restriction-rule-mgmt.component';

describe('RestrictionRuleMgmtComponent', () => {
  let component: RestrictionRuleMgmtComponent;
  let fixture: ComponentFixture<RestrictionRuleMgmtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestrictionRuleMgmtComponent]
    });
    fixture = TestBed.createComponent(RestrictionRuleMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
