import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { IFilterData } from '../../defines/IFilterData';
import { IOrg } from '../../defines/IOrg';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  orgs: IOrg;
  filterData = {} as IFilterData;
  @Output() search = new EventEmitter<IFilterData>();
  constructor(private activatedRoute: ActivatedRoute) {
  }

  applySearch() {
    Object.keys(this.filterData).forEach((key) => {
      if (!this.filterData[key]) {
        delete this.filterData[key];
      }
    });
    this.search.emit(this.filterData);
  }

  ngOnInit() {
    this.orgs = this.activatedRoute.snapshot.data['orgNames'];
  }

}
