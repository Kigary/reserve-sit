import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { IUser } from '../../defines/IUser';
import { MdDialog } from '@angular/material';
import { AccountUserService } from '../../services/auth.service';
import { UserLoginPageComponent } from '../login-page/login-page.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userLogged: IUser | boolean = false;

  constructor(public dialog: MdDialog,
              public router: Router,
              private accountUserService: AccountUserService) {
    this.accountUserService.getLoggedUser().subscribe(
      (user) => {
        if (user && typeof user === 'object' && !Object.keys(user).length) {
          return;
        }
        this.userLogged = user;
      });
  }

  openLoginDialog() {
    const ref = this.dialog.open(UserLoginPageComponent);
    ref.afterClosed().subscribe(
      () => this.router.navigate([{outlets: {account: null}}])
    );
  }
}
