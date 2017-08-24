import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SitService {

  constructor(private http: HttpClient) { }

  getAllSits() {
    return this.http.get(`/api/sit/sit-list-org`);
  }
  deleteSit(sitID) {
    return this.http.delete(`api/sit/${sitID}`);
  }
  createSit(data) {
    return this.http.post(`/api/sit/`, data)
      .catch(error => Observable.throw(error));
  }
  updateSit(data) {
    return this.http.post(`/api/sit/update/`, data);
  }
}
