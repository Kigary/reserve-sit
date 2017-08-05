import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ICountry} from '../../../defines/ICountry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CountryService {

    constructor(private http: HttpClient) {
  }

   getAllCounties(): Observable<ICountry[]> {
    return this.http.get('api/country/country-list').
      catch(() => Observable.throw('error'));
   }

}
