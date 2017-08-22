import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { UserLoginPageComponent } from '../login-page/login-page.component';
import { IUser} from '../../defines/IUser';
import { AccountUserService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  userLogged: IUser | null;

  constructor(public dialog: MdDialog,
              public router: Router,
              private accountUserService: AccountUserService) {
    this.accountUserService.getLoggedUser().subscribe((user) => this.userLogged = user);
  }

  openLoginDialog() {
    const ref = this.dialog.open(UserLoginPageComponent);
    ref.afterClosed().subscribe(() => this.router.navigate(['/']));
  }
}
