import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ISit } from '../../defines/ISit';
import { SitService } from '../services/sit/sit.service';
import {SitDialogComponent} from '../sit-dialog/sit-dialog.component';
import {MdDialog} from '@angular/material';
import {OrgService} from '../services/org/org.service';
import {AccountService} from '../services/auth/account.service';
import {IOrg} from '../../defines/IOrg';


@Component({
  selector: 'org-sits',
  templateUrl: './sits.component.html',
  styleUrls: [
    './sits.component.css'
  ]
})
export class SitsComponent implements OnInit {
  sits: ISit[];
  loggedOrg: IOrg;

  constructor(
    private sitService: SitService,
    public dialog: MdDialog,
    private orgService: OrgService,
    private accountService: AccountService) { }

  getAllSits(): void {
    this.sitService.getAllSits()
      .subscribe(sits => this.sits = sits as ISit[]);
  }

  addSit() {
    const dialogRef = this.dialog.open(SitDialogComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(data => data && this.sits.unshift(data));
  }

  deleteSit(sit) {
    const index = this.sits.indexOf(sit);
    this.sits.splice(index, 1);
  }

  // orgLogOut() {
  //   this.accountService.logOut().subscribe( () => {
  //     location.reload();
  //   });
  // }

  ngOnInit(): void {
    this.getAllSits();
    this.orgService.getLoggedOrg().subscribe(org => this.loggedOrg = org);
  }
}
