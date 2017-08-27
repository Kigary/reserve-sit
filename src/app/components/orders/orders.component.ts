import { Component } from '@angular/core';
import { IOrder } from '../../defines/IOrder';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent {
  orders: IOrder[];

  constructor(private orderService: OrderService) {
    this.orderService.getOrders().subscribe(
      (orders: IOrder[]) => this.orders = orders
    );
  }
}
