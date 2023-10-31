import { TestBed } from '@angular/core/testing';

import { QbankService } from './qbank.service';

describe('QbankService', () => {
  let service: QbankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QbankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
