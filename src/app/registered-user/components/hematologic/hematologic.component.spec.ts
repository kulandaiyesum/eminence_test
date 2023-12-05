import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HematologicComponent } from './hematologic.component';

describe('HematologicComponent', () => {
  let component: HematologicComponent;
  let fixture: ComponentFixture<HematologicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HematologicComponent]
    });
    fixture = TestBed.createComponent(HematologicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
