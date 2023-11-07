import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamtimedComfirmationComponent } from './examtimed-comfirmation.component';

describe('ExamtimedComfirmationComponent', () => {
  let component: ExamtimedComfirmationComponent;
  let fixture: ComponentFixture<ExamtimedComfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamtimedComfirmationComponent]
    });
    fixture = TestBed.createComponent(ExamtimedComfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
