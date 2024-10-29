import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalMetadataComponent } from './operational-metadata.component';

describe('OperationalMetadataComponent', () => {
  let component: OperationalMetadataComponent;
  let fixture: ComponentFixture<OperationalMetadataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationalMetadataComponent]
    });
    fixture = TestBed.createComponent(OperationalMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
