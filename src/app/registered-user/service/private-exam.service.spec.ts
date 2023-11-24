/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrivateExamService } from './private-exam.service';

describe('Service: PrivateExam', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrivateExamService]
    });
  });

  it('should ...', inject([PrivateExamService], (service: PrivateExamService) => {
    expect(service).toBeTruthy();
  }));
});
