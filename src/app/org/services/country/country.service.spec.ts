import { TestBed, inject } from '@angular/core/testing';

import { CountryService } from './country.service';

describe('CountriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryService]
    });
  });

  it('should be created', inject([CountryService], (service: CountryService) => {
    expect(service).toBeTruthy();
  }));
});
