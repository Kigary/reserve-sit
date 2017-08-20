import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IFilterData} from '../defines/IFilterData';
import {Observable} from 'rxjs/Observable';
import { IOrg } from '../defines/IOrg';

@Injectable()
export class OrgService {

  constructor(private http: HttpClient) { }

  getOrgNames(): Observable<IOrg[]> {
    return  this.http.get('api/org/org-names');
  }
}
