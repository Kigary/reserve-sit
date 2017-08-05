import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISit } from '../../../defines/ISit';

@Injectable()
export class SitService {
  sitList: ISit[];

  constructor(private http: HttpClient) { }

  getAllSits() {
    return this.http.get(`/api/sit/sit-list`);
  }
  deleteSit(sitID) {
    return this.http.delete(`api/sit/${sitID}`);
  }
  createSit(data) {
    return this.http.post(`/api/sit/`, data);
  }
  updateSit(data) {
    return this.http.post(`/api/sit/${data.sitID}`, data);
  }
}
