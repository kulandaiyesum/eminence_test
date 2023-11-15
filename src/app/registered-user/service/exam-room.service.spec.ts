import { TestBed } from '@angular/core/testing';

import { ExamRoomService } from './exam-room.service';

describe('ExamRoomService', () => {
  let service: ExamRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
