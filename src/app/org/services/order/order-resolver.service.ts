import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IOrder } from '../../../defines/IOrder';

@Injectable()
export class OrderResolverService implements Resolve<IOrder[]>{
  constructor(private orderService: OrderService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.orderService.getOrdersByOrg();
  }
}
