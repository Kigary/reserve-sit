import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ISit } from '../../defines/ISit';
import { SitService } from '../services/sit/sit.service';
import {SitDialogComponent} from '../sit-dialog/sit-dialog.component';
import {MdDialog} from '@angular/material';


@Component({
  selector: 'org-sits',
  templateUrl: './sits.component.html',
  styleUrls: [
    './sits.component.css'
  ]
})
export class SitsComponent implements OnInit {
  sits: ISit[];

  constructor(
    private sitService: SitService,
    private router: Router,
    public dialog: MdDialog) { }

  getAllSits(): void {
    this.sitService
      .getAllSits()
      .subscribe(sits => this.sits = sits as ISit[]);
  }

  addSit() {
    const dialogRef = this.dialog.open(SitDialogComponent, {
      data: {}
    });
  }

  deleteSit(sit) {
    const index = this.sits.indexOf(sit);
    this.sits.splice(index, 1);
  }

  saveSit(sit) {
    this.sits.splice(0, 0, sit);
  }

  ngOnInit(): void {
    this.getAllSits();
  }
}
