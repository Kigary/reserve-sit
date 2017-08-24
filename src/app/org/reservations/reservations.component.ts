import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IOrder } from '../../defines/IOrder';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { DataSource } from '@angular/cdk';
import { OrderService } from '../services/order/order.service';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'org-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  @ViewChild('search')
  search: ElementRef;

  orders: IOrder[];

  displayedColumns = ['name', 'reserveDate', 'user', 'action'];
  dataSource: OrderDataSource;

  constructor(private activatedRoute: ActivatedRoute,
              public dialog: MdDialog,
              private router: Router,
              private orderService: OrderService) {
  }

  ngOnInit() {
    // md-table bug workaround: https://github.com/angular/material2/issues/5593
    this.router.navigate(['org', 'home', 'reservations']);

    const elem = this.search.nativeElement;
    const searchChange = Observable.fromEvent(elem, 'input')
      .debounceTime(150)
      .distinctUntilChanged()
      .map(() => elem.value);

    this.dataSource = new OrderDataSource(
      this.activatedRoute,
      searchChange,
      this.orderService
    );
  }

  details(order) {
    this.dialog.open(OrderDialogComponent , {
      data: order
    });
  }

  releaseSit(order: IOrder) {
    this.orderService.finishOrder(order.orderID).subscribe((ord) => {
      order.releaseDate = ord.releaseDate;
    });
  }
}

export class OrderDataSource extends DataSource<IOrder> {
  orderSubject = new BehaviorSubject<IOrder[]>(null);
  searchValue = '';

  constructor(
    activatedRoute: ActivatedRoute,
    searchChange: Observable<string>,
    private orderService: OrderService
  ) {
    super();

    const {orderSubject} = this;

    activatedRoute.data
      .subscribe((resolvedData: { ReservationsResolverService: IOrder[] }) =>
        orderSubject.next(resolvedData.ReservationsResolverService));

    searchChange.subscribe(value => {
      this.searchValue = value;
      this.updateOrders();
    });
  }

  connect() {
    return this.orderSubject;
  }
  disconnect() {}

  updateOrders() {
    this.orderService.getOrgReservations(this.searchValue).subscribe(data => this.orderSubject.next(data));
  }
}
