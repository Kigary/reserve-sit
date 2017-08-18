import {Component, Input, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {OrderDialogComponent} from '../order-dialog/order-dialog.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  @Input()
  order: any;
  @Input()
  index: string;
  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }
  openDialog() {
     this.dialog.open(OrderDialogComponent , {
       data: this.order
     });
  }
}
