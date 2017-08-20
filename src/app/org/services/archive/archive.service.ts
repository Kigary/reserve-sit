import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IOrder } from '../../../defines/IOrder';

@Injectable()
export class ArchiveService {

  constructor(private http: HttpClient) { }

  getArchive() {
    return this.http.get(`/api/org/archive`) as Observable<IOrder[]>;
  }
}
