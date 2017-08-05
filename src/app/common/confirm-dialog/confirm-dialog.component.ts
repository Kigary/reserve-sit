import {Component, Inject, OnInit} from '@angular/core';
import {MdDialog, MD_DIALOG_DATA} from '@angular/material';

export interface IConfirmDialogOptions {
  msg: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  constructor(@Inject(MD_DIALOG_DATA) public data: IConfirmDialogOptions) { }
}
