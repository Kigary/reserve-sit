import { TestBed, inject } from '@angular/core/testing';

import { OrgNamesResolveService } from './orgnames-resolve.service';

describe('OrgnamesResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrgNamesResolveService]
    });
  });

  it('should be created', inject([OrgNamesResolveService], (service: OrgNamesResolveService) => {
    expect(service).toBeTruthy();
  }));
});
