import { TestBed } from '@angular/core/testing';

import { VetterService } from './vetter.service';

describe('VetterService', () => {
  let service: VetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
