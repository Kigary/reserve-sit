import { Injectable } from '@angular/core';
import { IOrder } from '../defines/IOrder';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get('api/order/order-list') as Observable<IOrder[]>;
  }
}
