import {Component, OnInit} from '@angular/core';

import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {OrgService} from '../services/org/org.service';


import {Router, ActivatedRoute} from '@angular/router';
import {ICountry} from '../../defines/ICountry';

export const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

@Component({
  selector: 'org-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css'],
})
export class RegisterAcounteComponent implements OnInit {
  countries: ICountry [];
  regForm: FormGroup;
  isSubmit: boolean;

  constructor(private fb: FormBuilder,
              private OrgService: OrgService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

   ngOnInit() {
    this.activatedRoute.data.forEach((data) => this.countries = data.countries);
    this.formBuild();
  }

  formBuild() {
    this.regForm = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(15)]],
      orgName: ['', [Validators.required]],
      email: ['', [Validators.pattern(EMAIL_REGEX)]],
      country: ['Armenia', []],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      fax: ['', []]
    });
  }

  orgRegister(data) {
    this.isSubmit = true;
    this.OrgService.createOrg(data.value).subscribe(() => {
        this.router.navigate(['org/account/login']);
      },
      (error) => console.log(error.message));
  }

  errorStateMatcher(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }
}
