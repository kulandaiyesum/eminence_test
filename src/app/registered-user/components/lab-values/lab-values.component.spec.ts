import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabValuesComponent } from './lab-values.component';

describe('LabValuesComponent', () => {
  let component: LabValuesComponent;
  let fixture: ComponentFixture<LabValuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabValuesComponent]
    });
    fixture = TestBed.createComponent(LabValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
