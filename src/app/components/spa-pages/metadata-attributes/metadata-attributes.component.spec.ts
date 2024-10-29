import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataAttributesComponent } from './metadata-attributes.component';

describe('MetadataAttributesComponent', () => {
  let component: MetadataAttributesComponent;
  let fixture: ComponentFixture<MetadataAttributesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetadataAttributesComponent]
    });
    fixture = TestBed.createComponent(MetadataAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
