import { Router } from '@angular/router';
import { ISit } from '../../defines/ISit';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SitService } from '../../services/sit.service';
import { IFilterData } from '../../defines/IFilterData';


@Component({
  selector: 'app-sits',
  templateUrl: './sits.component.html',
  styleUrls: ['./sits.component.scss']
})

export class SitsComponent implements OnInit {
  sits: ISit[];

  constructor(private activatedRoute: ActivatedRoute,
              private sitService: SitService,
              private router: Router) {
  }

  applySearch(data: IFilterData) {
    this.sitService.filterSits(data).subscribe(
      (sits: ISit[]) => this.sits = sits
    );
  }

  ngOnInit() {
    this.router.navigate([{outlets: {account: null}}]);
    this.sits = this.activatedRoute.snapshot.data['sits'];
  }
}
