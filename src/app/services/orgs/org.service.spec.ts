import { TestBed, inject } from '@angular/core/testing';

import { OrgsService } from './org.service';

describe('OrgsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrgsService]
    });
  });

  it('should be created', inject([OrgsService], (service: OrgsService) => {
    expect(service).toBeTruthy();
  }));
});
