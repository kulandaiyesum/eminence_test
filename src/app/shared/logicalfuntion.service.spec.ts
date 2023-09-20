import { TestBed } from '@angular/core/testing';

import { LogicalfuntionService } from './logicalfuntion.service';

describe('LogicalfuntionService', () => {
  let service: LogicalfuntionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogicalfuntionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
