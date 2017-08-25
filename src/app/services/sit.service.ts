import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IFilterData } from '../defines/IFilterData';
import { Observable } from 'rxjs/Observable';
import { ISit } from '../defines/ISit';


@Injectable()
export class SitService {

  constructor(private http: HttpClient) { }

  reserveSit(sitID, reserveDate) {
    return this.http.get(`/api/sit/reserve/${sitID}`, {
      params: new HttpParams().set('reserve', reserveDate)
    });
  }
  getAllSits() {
    return this.http.get('api/sit/sit-list');
  }

  filterSits(data: IFilterData): Observable<ISit[]> {
    const query = Object.keys(data)
      .map((key) => `${key}=${data[key]}`)
      .join('&');
    const params = new HttpParams({
      fromString: query
    });
    return this.http.get('api/sit/sit-filter', {params});
  }
}
