import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email: string;
  password: string;
  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
    console.log(1);
  }
}
