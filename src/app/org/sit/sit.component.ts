import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISit} from '../../defines/ISit';
import {MdDialog} from '@angular/material';
import {SitService} from '../services/sit/sit.service';
import {SitDialogComponent} from '../sit-dialog/sit-dialog.component';
import {clone} from '../../defines/common';
import {ConfirmDialogComponent, IConfirmDialogOptions} from '../../common/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'org-sit',
  templateUrl: './sit.component.html',
  styleUrls: ['./sit.component.css']
})
export class SitComponent implements OnInit {
  @Output()
  delete = new EventEmitter<ISit>();

  @Input()
  sit: ISit;

  constructor(private dialog: MdDialog, private sitService: SitService) {
  }

  editSit() {
    const dialogRef = this.dialog.open(SitDialogComponent, {
      data: clone(this.sit)
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      Object.assign(this.sit, result);
    });
  }

  deleteSit() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        msg: 'Are you sure?'
      } as IConfirmDialogOptions
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.sitService.deleteSit(this.sit.sitID).subscribe(() => this.delete.emit(this.sit));
    });
  }

  ngOnInit() {}

}
