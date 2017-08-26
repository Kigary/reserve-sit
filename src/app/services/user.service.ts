import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  createUser (data) {
    return this.http.post('api/user/', data).delay(500)
      .catch((error: HttpErrorResponse) => Observable.throw(error));
  }
}
