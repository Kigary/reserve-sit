import { TestBed, inject } from '@angular/core/testing';

import { SitsResolveService } from './sits-resolve.service';

describe('SitsResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitsResolveService]
    });
  });

  it('should be created', inject([SitsResolveService], (service: SitsResolveService) => {
    expect(service).toBeTruthy();
  }));
});
