import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerebrospinalFluidComponent } from './cerebrospinal-fluid.component';

describe('CerebrospinalFluidComponent', () => {
  let component: CerebrospinalFluidComponent;
  let fixture: ComponentFixture<CerebrospinalFluidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CerebrospinalFluidComponent]
    });
    fixture = TestBed.createComponent(CerebrospinalFluidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
