import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ISit } from '../../../defines/ISit';

@Injectable()
export class SitService {

  constructor(private http: HttpClient) { }

  getAllSits(search = '') {
    return this.http.get(`/api/sit/sit-list-org`,{
      params: new HttpParams().set('search', search)
    }) as Observable<ISit[]>;
  }
  deleteSit(sitID) {
    return this.http.delete(`api/sit/${sitID}`);
  }
  createSit(data) {
    return this.http.post(`/api/sit/`, data)
      .catch(error => Observable.throw(error));
  }
  updateSit(data) {
    return this.http.post(`/api/sit/update/`, data);
  }
}
