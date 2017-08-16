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
  del = new EventEmitter<ISit>();

  @Input()
  sit: ISit;

  constructor(private dialog: MdDialog, private sitService: SitService) {
  }

  editSit() {
    const dialogRef = this.dialog.open(SitDialogComponent, {
      data: clone(this.sit)
    });
    dialogRef.afterClosed().subscribe(result => result && Object.assign(this.sit, result));
  }

  deleteSit() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Sit',
        msg: `Are you sure you want to delete sit "${this.sit.sitName}" ?`,
        confirm: 'Delete',
        reject: 'Cancel'
      } as IConfirmDialogOptions
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.sitService.deleteSit(this.sit.sitID).subscribe(() => this.del.emit(this.sit));
    });
  }

  ngOnInit() {}

}
