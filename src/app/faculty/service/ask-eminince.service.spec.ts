import { TestBed } from '@angular/core/testing';

import { AskEmininceService } from './ask-eminince.service';

describe('AskEmininceService', () => {
  let service: AskEmininceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AskEmininceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
