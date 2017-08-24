import { Component, OnInit } from '@angular/core';
import { ISit } from '../../defines/ISit';
import { SitService } from '../../services/sit.service';
import { ActivatedRoute } from '@angular/router';
import { IFilterData } from '../../defines/IFilterData';
import { Router} from '@angular/router';

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
    this.router.navigate([{outlets: {account: null}}]);
  }

  ngOnInit() {
    this.sits = this.activatedRoute.snapshot.data['sits'];
  }
  applySearch(data: IFilterData) {
    this.sitService.filterSits(data).subscribe((sits: ISit[]) => this.sits = sits);
  }
}
