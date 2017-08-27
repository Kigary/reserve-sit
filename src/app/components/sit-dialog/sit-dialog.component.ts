import { ISit } from '../../defines/ISit';
import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-sit-dialog',
  templateUrl: './sit-dialog.component.html',
  styleUrls: ['./sit-dialog.component.scss']
})
export class SitDialogComponent {
  sit: ISit;

  constructor(@Inject(MD_DIALOG_DATA) data: ISit) {
    this.sit = data;
  }

  get reservedColor() {
    return this.sit.reserved ? 'warn' : 'accent';
  }

  get reservedText() {
    return ` ${this.sit.reserved ? '' : 'Not'} Reserved `;
  }
}
