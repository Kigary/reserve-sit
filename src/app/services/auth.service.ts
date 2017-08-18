import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import { Subject } from 'rxjs/Subject';
import { IUser } from '../defines/IUser';

@Injectable()
export class AccountUserService {
  private userSubject = new Subject<IUser>();

  constructor(private http: HttpClient) {
    this.http.get('/api/user/logged-user')
      .subscribe((loggedInUser: IUser) => {
        this.userSubject.next(loggedInUser);
      });
  }

  logIn(data) {
    const user = this.http.post('api/user/login', data)
      .catch((error: HttpErrorResponse) => Observable.throw(error));
    user.subscribe((data: IUser) => this.userSubject.next(data));
    return user;
  }

  logOut() {
    const logOut$ = this.http.get('api/user/logout');
    logOut$.subscribe(() => this.userSubject.next(null));
    return this.userSubject;
  }

  getLoggedUser(): Observable<IUser> {
    return this.userSubject;
  }
}
