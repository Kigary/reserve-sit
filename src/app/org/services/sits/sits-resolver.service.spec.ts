import { TestBed, inject } from '@angular/core/testing';

import { SitsResolverService } from './sits-resolver.service';

describe('SitsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitsResolverService]
    });
  });

  it('should be created', inject([SitsResolverService], (service: SitsResolverService) => {
    expect(service).toBeTruthy();
  }));
});
