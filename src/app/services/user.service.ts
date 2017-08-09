import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import {IUser} from '../defines/IUser';
@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  createUser (data) {
    return this.http.post('api/user/', data).delay(2000)
      .catch(() => Observable.throw('error'));
  }
  getLoggedUser(): Observable<IUser> {
    return this.http.get('api/user/logged-user');
  }
}