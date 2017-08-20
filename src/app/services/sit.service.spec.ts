import { TestBed, inject } from '@angular/core/testing';

import { SitService } from './sit.service';

describe('SitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitService]
    });
  });

  it('should be created', inject([SitService], (service: SitService) => {
    expect(service).toBeTruthy();
  }));
});
