import { TestBed, inject } from '@angular/core/testing';

import { ArchiveResolverService } from './archive-resolver.service';

describe('ArchiveResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArchiveResolverService]
    });
  });

  it('should be created', inject([ArchiveResolverService], (service: ArchiveResolverService) => {
    expect(service).toBeTruthy();
  }));
});
