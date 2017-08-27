import { MdPaginator, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IOrder } from '../../defines/IOrder';
import { IPagingData } from '../../defines/IPagingData';
import { OrderService } from '../services/order/order.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

export class OrderDataSource extends DataSource<IOrder> {
  orderSubject = new BehaviorSubject<IPagingData<IOrder>>(null);
  searchValue = '';

  get totalCount() {
    return this.orderSubject.value.totalCount;
  }

  constructor(private orderService: OrderService,
              activatedRoute: ActivatedRoute,
              searchChange: Observable<string>,
              paginator: MdPaginator) {
    super();

    const {orderSubject} = this;

    activatedRoute.data.subscribe(
      (resolvedData: { archive: IPagingData<IOrder> }) =>
        orderSubject.next(resolvedData.archive)
    );
    searchChange.subscribe(
      value => {
        this.searchValue = value;
        orderService.pagingConfig.pageIndex = 0;
        this.updateOrders();
      });

    paginator.page.subscribe(
      (pageEvent: PageEvent) => {
        orderService.pagingConfig.pageSize = pageEvent.pageSize;
        orderService.pagingConfig.pageIndex = pageEvent.pageIndex;
        this.updateOrders();
      });
  }

  connect() {
    return this.orderSubject.map(pagingData => pagingData.data);
  }

  disconnect() {
  }

  updateOrders() {
    this.orderService.getOrgArchivedOrders(this.searchValue).subscribe(
      data => this.orderSubject.next(data)
    );
  }
}
