import { TestBed } from '@angular/core/testing';

import { QuerstionService } from './querstion.service';

describe('QuerstionService', () => {
  let service: QuerstionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuerstionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
