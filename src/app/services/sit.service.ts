import { ISit } from '../defines/ISit';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IFilterData } from '../defines/IFilterData';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class SitService {

  constructor(private http: HttpClient) {
  }

  reserveSit(sitID, reserveDate) {
    return this.http.get(`/api/sit/reserve/${sitID}`, {
      params: new HttpParams().set('reserve', reserveDate)
    });
  }

  getAllSits() {
    return this.http.get('api/sit/sit-list') as Observable<ISit[]>;
  }

  filterSits(data: IFilterData): Observable<ISit[]> {
    const params = Object.keys(data)
      .reduce((params, key) => params.set(key, data[key]), new HttpParams());
    return this.http.get('api/sit/sit-filter', {params});
  }
}
