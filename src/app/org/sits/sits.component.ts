import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ISit } from '../../defines/ISit';
import { SitService } from '../services/sit/sit.service';
import {SitDialogComponent} from '../sit-dialog/sit-dialog.component';
import {MdDialog} from '@angular/material';
import {OrgService} from '../services/org/org.service';
import {IOrg} from '../../defines/IOrg';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'org-sits',
  templateUrl: './sits.component.html',
  styleUrls: [
    './sits.component.scss'
  ]
})
export class SitsComponent implements OnInit {
  @ViewChild('search')
  search: ElementRef;

  searchValue = '';

  sits: ISit[];
  loggedOrg: IOrg;

  sitSubject = new BehaviorSubject<ISit[]>(null);

  constructor(
    private activatedRoute: ActivatedRoute,
    private sitService: SitService,
    public dialog: MdDialog,
    private orgService: OrgService) { }

  // getAllSits(): void {
  //   this.sitService.getAllSits()
  //     .subscribe(sits => this.sits = sits as ISit[]);
  // }



  updateSits() {
    this.sitService.getAllSits(this.searchValue).subscribe(data => {
      this.sits = data as ISit[];
      return this.sitSubject.next(data);
    })
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

  ngOnInit(): void {
    this.orgService.getLoggedOrg().subscribe(org => this.loggedOrg = org);

    const elem = this.search.nativeElement;
    const searchChange = Observable.fromEvent(elem, 'input')
      .debounceTime(150)
      .distinctUntilChanged()
      .map(() => elem.value);

    this.activatedRoute.data
      .subscribe((resolvedData: { sits: ISit[] }) => {
        this.sitSubject.next(resolvedData.sits);
      });

    searchChange.subscribe(value => {
      this.searchValue = value;
      this.updateSits();
    });
    this.updateSits();
  }

}
