import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IOrder } from '../defines/IOrder';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  // createOrder() {
  //   return this.http.get( 'api/org')
  // }

  getOrders() {
    return this.http.get('api/order/order-list') as Observable<IOrder[]>;
  }
}
