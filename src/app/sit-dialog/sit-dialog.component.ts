import {Component, Inject, Input, OnInit} from '@angular/core';
import {ISit} from '../defines/ISit';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-sit-dialog',
  templateUrl: './sit-dialog.component.html',
  styleUrls: ['./sit-dialog.component.css']
})
export class SitDialogComponent implements OnInit {
  sit: ISit;

  constructor(
    @Inject(MD_DIALOG_DATA) data: ISit
  ) {
    this.sit = data;
  }

  ngOnInit() {
  }

}
