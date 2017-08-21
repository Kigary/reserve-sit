import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import { IUser } from '../defines/IUser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

@Injectable()
export class AccountUserService {
  private userSubject = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
    this.isLoggedUser()
      .subscribe((loggedInUser: IUser) => this.userSubject.next(loggedInUser));
  }

  logIn(data) {
    return  this.http.post('api/user/login', data)
      .do((user: IUser) => this.userSubject.next(user))
      .catch((error: HttpErrorResponse) => Observable.throw(error));
  }

  logOut() {
    const logOut$ = this.http.get('api/user/logout');
    logOut$.subscribe(() => this.userSubject.next(null));
    return this.userSubject;
  }

  getLoggedUser() {
    return this.userSubject;
  }
  isLoggedUser() {
    return this.http.get('/api/user/logged-user');
  }
}
