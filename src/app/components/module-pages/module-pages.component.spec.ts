import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulePagesComponent } from './module-pages.component';

describe('ModulePagesComponent', () => {
  let component: ModulePagesComponent;
  let fixture: ComponentFixture<ModulePagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModulePagesComponent]
    });
    fixture = TestBed.createComponent(ModulePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
