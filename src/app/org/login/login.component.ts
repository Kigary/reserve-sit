import { Component, OnInit } from '@angular/core';
import {User} from '../../defines/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  constructor() { }

  ngOnInit() {
  }
  onSubmit() {
  }

}
