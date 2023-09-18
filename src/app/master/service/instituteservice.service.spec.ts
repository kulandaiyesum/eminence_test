import { TestBed } from '@angular/core/testing';

import { InstituteserviceService } from './instituteservice.service';

describe('InstituteserviceService', () => {
  let service: InstituteserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstituteserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
