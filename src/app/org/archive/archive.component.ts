import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MdDialog, MdPaginator } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order/order.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { dateTimeFormat } from '../../defines/common';
import { OrderDataSource } from "app/org/data-sources/order.data-source";


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

  get dateFormat() { return dateTimeFormat.format; }

  get pagingConfig() {
    return this.orderService.pagingConfig;
  }

  displayedColumns = ['sitName', 'user', 'reserveDate', 'releaseDate', 'action'];
  dataSource: OrderDataSource;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private dialog: MdDialog
  ) {}

  details(order) {
    this.dialog.open(OrderDialogComponent , {
      data: order
    });
  }

  ngOnInit() {
    this.router.navigate(['org', 'home', 'archive']);

    const elem = this.search.nativeElement;
    const searchChange = Observable.fromEvent(elem, 'input')
      .debounceTime(150)
      .distinctUntilChanged()
      .map(() => elem.value);

    this.dataSource = new OrderDataSource(
      this.orderService,
      this.activatedRoute,
      searchChange,
      this.paginator
    );
  }
}
