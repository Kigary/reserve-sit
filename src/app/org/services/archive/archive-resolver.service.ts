import { Injectable } from '@angular/core';
import { OrderService } from '../order/order.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IPagingData } from '../../../defines/IPagingData';
import { IOrder } from '../../../defines/IOrder';

@Injectable()
export class ArchiveResolverService implements Resolve<IPagingData<IOrder>>{

  constructor(private orderService: OrderService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.orderService.getOrgArchivedOrders();
  }
}
