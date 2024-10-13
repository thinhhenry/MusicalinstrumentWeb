import { TestBed } from '@angular/core/testing';

import { ApiupdateService } from './apiupdate.service';

describe('ApiupdateService', () => {
  let service: ApiupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
