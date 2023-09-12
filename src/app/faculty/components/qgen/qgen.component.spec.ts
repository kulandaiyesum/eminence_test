import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QgenComponent } from './qgen.component';

describe('QgenComponent', () => {
  let component: QgenComponent;
  let fixture: ComponentFixture<QgenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QgenComponent]
    });
    fixture = TestBed.createComponent(QgenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
