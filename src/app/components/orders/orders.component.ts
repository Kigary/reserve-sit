import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import {Observable} from 'rxjs/Observable';
import { IOrder } from '../../defines/IOrder'


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[];
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders().subscribe((orders: IOrder[]) => this.orders = orders);
  }

}
