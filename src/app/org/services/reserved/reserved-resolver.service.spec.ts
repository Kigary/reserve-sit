import { TestBed, inject } from '@angular/core/testing';

import { ReservedResolverService } from './reserved-resolver.service';

describe('ReservedResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservedResolverService]
    });
  });

  it('should be created', inject([ReservedResolverService], (service: ReservedResolverService) => {
    expect(service).toBeTruthy();
  }));
});
