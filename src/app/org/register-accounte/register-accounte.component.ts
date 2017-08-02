import {Component, OnInit} from '@angular/core';
import {CountriesService} from '../../services/countries/countries.service';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {EMAIL_REGEX} from '../login/login.component';
import {Country} from '../../defines/country';

@Component({
  selector: 'app-register-acounte',
  templateUrl: './register-accounte.component.html',
  styleUrls: ['./register-accounte.component.css'],
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
      name: ['', Validators.required],
      country: ['Armenia'],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pNumber: ['', [Validators.required, Validators.pattern(/^\d*$/)]],
      fNumber: ['']
    });
  }

  onSubmit() {
  }
}
