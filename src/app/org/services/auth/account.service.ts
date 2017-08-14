import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) { }

  login (data) {
    return this.http.post('api/org/login', data).delay(1000)
      .catch((error) => Observable.throw(error));
  }

  logOut () {
    return this.http.get('api/org/logout').delay(1000)
      .catch((error) => Observable.throw(error));
  }

  isLoggedIn() {
    return this.http.get('/api/org/is-logged-in') as Observable<boolean>;
  }

}
