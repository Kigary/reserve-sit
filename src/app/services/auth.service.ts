import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';

@Injectable()
export class AccountUserService {
  constructor(private http: HttpClient) {
  }

  logIn(data) {
    return this.http.post('api/user/login', data).delay(1000)
      .catch((error) => Observable.throw(error));
  }

  logOut() {
    return this.http.get('api/user/logout')
      .catch((error) => Observable.throw(error));
  }
}
