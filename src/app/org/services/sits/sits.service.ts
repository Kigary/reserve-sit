import { Injectable } from '@angular/core';
import {createGUID} from '../../../../server-api/common/index';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { ISit } from '../../../defines/ISit';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class SitsService {

  private sitsUrl = 'api/sit/sit-list';  // URL to web api

  constructor(private http: HttpClient) { }

  getAllSits(): Observable<ISit[]> {
    return this.http.get(this.sitsUrl)
      .catch(() => Observable.throw('error'));
  }


  getSit(id: string): Observable<ISit> {
    const url = `${this.sitsUrl}/${id}`;
    return this.http.get(url)
      .catch(() => Observable.throw('error'));
  }

  delete(id: string): Observable<void> {
    const url = `${this.sitsUrl}/${id}`;
    return this.http.delete(url)
      .catch(() => Observable.throw('error'));
  }

  create(...fields: string[]): Observable<ISit> {
    return this.http
      .post(this.sitsUrl, JSON.stringify(
        {
          sitID: createGUID(),
          orgID: fields[0],
          sitName: fields[1],
          numOfSits: +fields[2],
          reserved: fields[3] === 'true',
          cost: +fields[4],
          paid: fields[5] === 'true',
          image: fields[6],
          parentOrgID: fields[7]
        }))
      .catch(() => Observable.throw('error'));
  }

  update(sit: ISit): Observable<ISit> {
    const url = `${this.sitsUrl}/${sit.sitID}`;
    return this.http
      .put(url, JSON.stringify(sit))
      .catch(() => Observable.throw('error'));
  }
}
