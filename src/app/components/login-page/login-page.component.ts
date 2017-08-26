import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class UserLoginPageComponent {

  constructor(private router: Router) {
    this.router.navigate(['', {outlets: {'account': 'login'}}]);
  }
}
