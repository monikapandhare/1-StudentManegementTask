import { TestBed } from '@angular/core/testing';

import { SudentInfoService } from './sudent-info.service';

describe('SudentInfoService', () => {
  let service: SudentInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SudentInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
