import { Injectable } from '@angular/core';
import { OrderService } from '../order/order.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ArchiveResolverService {

  constructor(private orderService: OrderService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.orderService.getOrgArchivedOrders();
  }
}
