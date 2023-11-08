import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerumValuesComponent } from './serum-values.component';

describe('SerumValuesComponent', () => {
  let component: SerumValuesComponent;
  let fixture: ComponentFixture<SerumValuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SerumValuesComponent]
    });
    fixture = TestBed.createComponent(SerumValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
