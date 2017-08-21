import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from '../../defines/IOrder';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { DataSource } from '@angular/cdk';
import { OrderService } from '../services/order/order.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'org-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[];
  @Input()
  disabled = false;

  displayedColumns = ['sitName', 'reserveDate', 'user', 'action'];
  dataSource: OrderDataSource;

  constructor(private activatedRoute: ActivatedRoute,
              public dialog: MdDialog,
              private router: Router,
              private orderService: OrderService) {
    this.dataSource = new OrderDataSource(this.activatedRoute);
  }

  ngOnInit() {
    // md-table bug workaround: https://github.com/angular/material2/issues/5593
    this.router.navigate(['org', 'home', 'orders']);
  }

  details(order) {
    this.dialog.open(OrderDialogComponent , {
      data: order
    });
  }

  releaseSit(order: IOrder) {
    this.orderService.finishOrder(order.orderID).subscribe(() => {
      order.sit.reserved = false;
    });
  }
}

export class OrderDataSource extends DataSource<IOrder> {

  constructor(private activatedRoute: ActivatedRoute) {
    super();
  }

  /* Connect function called by the table to retrieve one stream containing the data to render. */
  connect() {
    return this.activatedRoute.data.map(
      (resolvedData: { OrderResolverService: IOrder[] }) => resolvedData.OrderResolverService);
  }

  disconnect() {
  }
}
