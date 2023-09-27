import { TestBed } from '@angular/core/testing';

import { QgenService } from './qgen.service';

describe('QgenService', () => {
  let service: QgenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QgenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
