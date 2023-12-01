import { TestBed } from '@angular/core/testing';

import { LiveExamService } from './live-exam.service';

describe('LiveExamService', () => {
  let service: LiveExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
