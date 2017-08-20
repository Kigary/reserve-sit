import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from '../../defines/IOrder';
import { ActivatedRoute, Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { DataSource } from '@angular/cdk';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'org-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  archive: IOrder[];
  @Input()
  disabled = false;
  @Input()
  innerText = ' Return ';

  displayedColumns = ['sitName', 'userName', 'reserveDate', 'action'];
  dataSource: ArchiveDataSource;

  constructor(private activatedRoute: ActivatedRoute,
              public dialog: MdDialog,
              private router: Router,
              private archiveService: OrderService) {
    this.dataSource = new ArchiveDataSource(this.activatedRoute);
  }

  ngOnInit() {
    // md-table bug workaround: https://github.com/angular/material2/issues/5593
    this.router.navigate(['org', 'home', 'archive']);
  }

  // releaseSit(order: IOrder) {
  //   this.orderService.finishOrder(order.orderID).subscribe(() => {
  //     order.sit.reserved = false;
  //   });
  // }
}

export class ArchiveDataSource extends DataSource<IOrder> {

  constructor(private activatedRoute: ActivatedRoute) {
    super();
  }

  /* Connect function called by the table to retrieve one stream containing the data to render. */
  connect() {
    return this.activatedRoute.data.map(
      (resolvedData: { ArchiveResolverService: IOrder[] }) => resolvedData.ArchiveResolverService);
  }

  disconnect() {
  }
}
