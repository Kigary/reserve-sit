import { Component, OnInit } from '@angular/core';

import {ISit} from '../defines/ISit';
import {SitService} from '../services/sit/sit.service';

@Component({
  selector: 'app-sits',
  templateUrl: './sits.component.html',
  styleUrls: ['./sits.component.css']
})
export class SitsComponent implements OnInit {
  sits: ISit[];

  constructor(
    private sitService: SitService) { }

  getAllSits(): void {
    this.sitService
      .getAllSits()
      .subscribe(sits => this.sits = sits as ISit[]);
  }

  ngOnInit(): void {
    this.getAllSits();
  }

}
