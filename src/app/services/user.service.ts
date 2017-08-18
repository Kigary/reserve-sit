import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {

  }
  createUser (data) {
    return this.http.post('api/user/', data).delay(2000)
      .catch((error: HttpErrorResponse) => Observable.throw(error));
  }
}
