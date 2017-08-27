import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IOrg } from '../../defines/IOrg';
import { ActivatedRoute } from '@angular/router';
import { IFilterData } from '../../defines/IFilterData';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  orgs: IOrg;
  filterData: FormGroup;
  @Output() search = new EventEmitter<IFilterData>();

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
  }

  formBuild() {
    this.filterData = this.fb.group({
      orgID: [''],
      sits: ['', Validators.pattern(/^\d*$/)],
      minPrice: ['', Validators.pattern(/^\d*$/)],
      maxPrice: ['', Validators.pattern(/^\d*$/)],
    });
    this.filterData.valueChanges
      .debounceTime(300)
      .subscribe((data) => this.filterSits(data));
  }

  filterSits(filterData) {
    Object.keys(filterData).forEach((key) => {
      if (!filterData[key]) {
        delete filterData[key];
      }
    });
    this.search.emit(filterData);
  }

  errorStateMatcher(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }

  ngOnInit() {
    this.orgs = this.activatedRoute.snapshot.data['orgNames'];
    this.formBuild();
  }
}
