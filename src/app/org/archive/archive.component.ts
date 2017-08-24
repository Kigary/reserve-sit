import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MdPaginator, PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order/order.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IOrder } from '../../defines/IOrder';
import { IPagingData } from '../../defines/IPagingData';


@Component({
  selector: 'org-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  @ViewChild('search')
  search: ElementRef;

  @ViewChild(MdPaginator)
  paginator: MdPaginator;

  get pagingConfig() {
    return this.orderService.pagingConfig;
  }

  displayedColumns = ['sitName', 'user', 'reserveDate', 'releaseDate', 'action'];
  dataSource: OrderDataSource;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.router.navigate(['org', 'home', 'archive']);

    const elem = this.search.nativeElement;
    const searchChange = Observable.fromEvent(elem, 'input')
      .debounceTime(150)
      .distinctUntilChanged()
      .map(() => elem.value);

    this.dataSource = new OrderDataSource(
      this.activatedRoute,
      searchChange,
      this.orderService,
      this.paginator
    );
  }
}

export class OrderDataSource extends DataSource<IOrder> {
  orderSubject = new BehaviorSubject<IPagingData<IOrder>>(null);
  searchValue = '';

  get totalCount() {
    return this.orderSubject.value.totalCount;
  }

  constructor(
    activatedRoute: ActivatedRoute,
    searchChange: Observable<string>,
    private orderService: OrderService,
    paginator: MdPaginator
  ) {
    super();

    const {orderSubject} = this;

    activatedRoute.data
      .subscribe((resolvedData: { ArchiveResolverService: IPagingData<IOrder> }) =>
        orderSubject.next(resolvedData.ArchiveResolverService));

    searchChange.subscribe(value => {
      this.searchValue = value;
      this.updateOrders();
    });

    paginator.page.subscribe((pageEvent: PageEvent) => {
      orderService.pagingConfig.pageSize = pageEvent.pageSize;
      orderService.pagingConfig.pageIndex = pageEvent.pageIndex;
      this.updateOrders();
    });
  }

  connect() {
    return this.orderSubject.map(pagingData => pagingData.data);
  }
  disconnect() {}

  updateOrders() {
    this.orderService.getOrgArchivedOrders(this.searchValue).subscribe(data => this.orderSubject.next(data));
  }
}
