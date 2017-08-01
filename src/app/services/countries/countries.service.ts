import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Country} from '../../defines/country';
import 'rxjs/add/operator/catch';

@Injectable()
export class CountriesService {

    constructor(private http: HttpClient) {
  }

   getAllCounties(): Observable<Country[]> {
    return this.http.get('api/country/country-list').
      catch(() => Observable.throw('error'));
   }

}
