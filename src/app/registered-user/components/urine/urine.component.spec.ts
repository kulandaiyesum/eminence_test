import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrineComponent } from './urine.component';

describe('UrineComponent', () => {
  let component: UrineComponent;
  let fixture: ComponentFixture<UrineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UrineComponent]
    });
    fixture = TestBed.createComponent(UrineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
