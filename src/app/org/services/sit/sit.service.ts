import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SitService {

  constructor(private http: HttpClient) { }

  getAllSits() {
    return this.http.get(`/api/sit/sit-list`);
  }
  deleteSit(sitID) {
    return this.http.delete(`api/sit/${sitID}`);
  }
  createSit(data) {
    return this.http.post(`/api/sit/sit-list`, data);
  }
  updateSit(data) {
    return this.http.post(`/api/sit/${data.sitID}`, data);
  }
}
