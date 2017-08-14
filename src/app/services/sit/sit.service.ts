import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SitService {

  constructor(private http: HttpClient) { }

  getAllSits() {
    return this.http.get(`/api/sit/sit-list`);
  }
  reserveSit(sitID) {
    return this.http.get(`/api/sit/${sitID}` );
  }
}
