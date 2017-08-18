import {Component, Inject, Input, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {
  order: any;
  constructor(@Inject(MD_DIALOG_DATA) data: any) {
    console.log(data);
    this.order = data;
  }

  ngOnInit() {
  }

}
