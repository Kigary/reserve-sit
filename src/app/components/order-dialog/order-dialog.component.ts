import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { dateTimeFormat } from '../../defines/common';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.scss']
})
export class OrderDialogComponent {
  order: any;
  dateFormat = dateTimeFormat.format;

  constructor(@Inject(MD_DIALOG_DATA) data: any) {
    this.order = data;
  }
}
