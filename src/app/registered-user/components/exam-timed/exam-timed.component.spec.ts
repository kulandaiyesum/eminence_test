import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamTimedComponent } from './exam-timed.component';

describe('ExamTimedComponent', () => {
  let component: ExamTimedComponent;
  let fixture: ComponentFixture<ExamTimedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamTimedComponent]
    });
    fixture = TestBed.createComponent(ExamTimedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
