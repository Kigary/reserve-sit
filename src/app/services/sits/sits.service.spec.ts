import { TestBed, inject } from '@angular/core/testing';

import { SitsService } from './sits.service';

describe('SitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitsService]
    });
  });

  it('should be created', inject([SitsService], (service: SitsService) => {
    expect(service).toBeTruthy();
  }));
});
