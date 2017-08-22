import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.post(`/api/sit/`, data);
  }
  updateSit(data) {
    return this.http.post(`/api/sit/update/`, data);
  }
}
