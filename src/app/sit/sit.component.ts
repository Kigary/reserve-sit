import { Component, Input, OnInit } from '@angular/core';
import {ISit} from '../defines/ISit';
import {MdDialog} from '@angular/material';
import {SitService} from '../services/sit.service';
import {SitDialogComponent} from '../sit-dialog/sit-dialog.component';
import {ConfirmDialogComponent, IConfirmDialogOptions} from '../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-sit',
  templateUrl: './sit.component.html',
  styleUrls: ['./sit.component.scss']
})
export class SitComponent implements OnInit {

  @Input()
  sit: ISit;

  constructor(private dialog: MdDialog, private sitService: SitService) { }

  sitDetails() {
    const dialogRef = this.dialog.open(SitDialogComponent, {
      data: this.sit
    });
  }

  reserveSit() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        msg: 'Really bro?'
      } as IConfirmDialogOptions
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.sitService.reserveSit(this.sit.sitID).subscribe(() => this.sit.reserved = !this.sit.reserved);
    });
  }

  ngOnInit() {
  }

}
