import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';


export interface IConfirmDialogOptions {
  title: string;
  msg: string;
  confirm: string;
  reject: string;
}
@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(@Inject(MD_DIALOG_DATA) public data: IConfirmDialogOptions) { }
}
