import { MdDialog} from '@angular/material';
import { dateTimeFormat } from '../../defines/common';
import { Component, Input } from '@angular/core';
import { OrderDialogComponent} from '../order-dialog/order-dialog.component';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent {
  @Input()
  order: any;
  @Input()
  index: string;

  dateFormat = dateTimeFormat.format;

  constructor(public dialog: MdDialog) { }

  openDialog() {
     this.dialog.open(OrderDialogComponent , {
       data: this.order
     });
  }
}
