import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Country} from '../../../defines/country';
import {CountryService} from './country.service';
@Injectable()
export class CountriesResolve  implements Resolve<Country[]> {

  constructor(private CountriesService: CountryService) {
  }
  resolve() {
      return this.CountriesService.getAllCounties();
  }
}
