import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveExamroomComponent } from './live-examroom.component';

describe('LiveExamroomComponent', () => {
  let component: LiveExamroomComponent;
  let fixture: ComponentFixture<LiveExamroomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveExamroomComponent]
    });
    fixture = TestBed.createComponent(LiveExamroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
