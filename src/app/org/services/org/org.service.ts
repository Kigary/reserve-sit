import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
@Injectable()
export class OrgService {

  constructor(private http: HttpClient) { }

  createOrg (data) {
    return this.http.post('api/org/', data).delay(2000)
      .catch(() => Observable.throw('error'));
  }

  getLoggedOrg(): Observable<any> {
    return this.http.get('api/org/logged-org');
  }
  isLoggedIn() {
    return this.http.get('/api/org/is-logged-in') as Observable<boolean>;
  }
}
