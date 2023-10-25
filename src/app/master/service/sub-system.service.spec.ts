import { TestBed } from '@angular/core/testing';

import { SubSystemService } from './sub-system.service';

describe('SubSystemService', () => {
  let service: SubSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
