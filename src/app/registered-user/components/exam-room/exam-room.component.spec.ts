import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamRoomComponent } from './exam-room.component';

describe('ExamRoomComponent', () => {
  let component: ExamRoomComponent;
  let fixture: ComponentFixture<ExamRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExamRoomComponent]
    });
    fixture = TestBed.createComponent(ExamRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
