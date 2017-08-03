import {Component, OnInit} from '@angular/core';
import {CountriesService} from '../../services/countries/countries.service';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {EMAIL_REGEX} from '../login/login.component';
import {Country} from '../../defines/country';

@Component({
  selector: 'app-register-acounte',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css'],
})
export class RegisterAcounteComponent implements OnInit {
  countries: Country [];
  regForm: FormGroup;

  constructor(private CountriesService: CountriesService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.CountriesService.getAllCounties()
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
