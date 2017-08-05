import {Component, OnInit} from '@angular/core';
import {CountryService} from '../services/country/country.service';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {EMAIL_REGEX} from '../login/login.component';
import {ICountry} from '../../defines/ICountry';

@Component({
  selector: 'org-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css'],
})
export class RegisterAcounteComponent implements OnInit {
  countries: ICountry [];
  regForm: FormGroup;

  constructor(private CountryService: CountryService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.CountryService.getAllCounties()
      .subscribe((data) => this.countries = data);

    this.formBuild();
  }

  formBuild() {
    this.regForm = this.fb.group({
      email: ['', [Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(15)]],
      name: ['', [Validators.required]],
      country: ['Armenia', []],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      pNumber: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      fNumber: ['', []]
    });
  }

  OrgRegister() {
  }

  ErrorStateMatcher(control: FormControl): boolean {
    return control.invalid && (control.dirty || control.touched);
  }
}
