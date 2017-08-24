import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { dateTimeFormat } from '../../defines/common';

@Component({
  selector: 'org-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent implements OnInit {
  order: any;

  get dateFormat() { return dateTimeFormat.format; }

  constructor(@Inject(MD_DIALOG_DATA) data: any) {
    this.order = data;
  }

  ngOnInit() {
  }

}
