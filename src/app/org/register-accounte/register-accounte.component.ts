import { Component, OnInit } from '@angular/core';
import {CountriesService} from '../../services/countries/countries.service';
import {Country} from '../../defines/country';

@Component({
  selector: 'app-register-acounte',
  templateUrl: './register-accounte.component.html',
  styleUrls: ['./register-accounte.component.css'],
})
export class RegisterAcounteComponent implements OnInit {
  countries: Country [];
  countryID: string;

  constructor(private CountriesService: CountriesService) { }

  ngOnInit() {
    this.CountriesService.getAllCounties()
       .subscribe((data) => this.countries = data);
  }

}
