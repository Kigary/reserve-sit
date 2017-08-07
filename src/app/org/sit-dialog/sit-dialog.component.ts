import {Component, Inject, Input, OnInit} from '@angular/core';
import {ISit} from '../../defines/ISit';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {SitService} from '../services/sit/sit.service';

@Component({
  selector: 'org-sit-dialog',
  templateUrl: './sit-dialog.component.html',
  styleUrls: ['./sit-dialog.component.scss']
})
export class SitDialogComponent implements OnInit {
  @Input()
  inProgress = false;

  @Input()
  sit: ISit;

  constructor(
    @Inject(MD_DIALOG_DATA) data: ISit,
    private dialogRef: MdDialogRef<ISit>,
    private sitService: SitService
  ) {
    this.sit = data;
  }
  saveSit(data) {
    const obs = data.sitID ? this.sitService.updateSit(data) : this.sitService.createSit(data);
    this.inProgress = true;
    data.image = data.image.slice(11);
    obs.subscribe(sit => this.dialogRef.close(sit));
  }

  ngOnInit() {
  }

}
