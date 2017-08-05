import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {ICountry} from '../../../defines/ICountry';
import {CountryService} from './country.service';
@Injectable()
export class CountriesResolve  implements Resolve<ICountry[]> {

  constructor(private CountriesService: CountryService) {
  }
  resolve() {
      return this.CountriesService.getAllCounties();
  }
}
