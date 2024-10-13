import { TestBed } from '@angular/core/testing';

import { MusicalInsService } from './musical-ins.service';

describe('MusicalInsService', () => {
  let service: MusicalInsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicalInsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
