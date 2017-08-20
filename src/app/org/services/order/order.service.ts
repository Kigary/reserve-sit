import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IOrder } from '../../../defines/IOrder';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrdersByOrg() {
    return this.http.get(`/api/org/orders`) as Observable<IOrder[]>;
  }

  // finishOrder(orderID) {
  //   return this.http.get(`/api/org/order/release/${orderID}`) as Observable<IOrder>;
  // }
}
