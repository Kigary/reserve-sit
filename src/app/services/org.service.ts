import { IOrg } from '../defines/IOrg';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class OrgService {

  constructor(private http: HttpClient) { }

  getOrgNames(): Observable<IOrg[]> {
    return this.http.get('api/org/org-names');
  }
}
