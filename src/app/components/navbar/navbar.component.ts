import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {UserLoginPageComponent} from '../login-page/login-page.component';
import {UserService} from '../../services/user.service';
import {IUser} from '../../defines/IUser';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  userLogged: boolean;
  user: IUser;

  constructor(public dialog: MdDialog, private userService: UserService , private  router: Router) {
  }

  openLoginDialog() {
    const ref = this.dialog.open(UserLoginPageComponent);
    ref.afterClosed().subscribe((data) => this.checkLogin(data) && this.router.navigate(['/']));
  }

  ngOnInit() {
    this.userService.getLoggedUser().subscribe(
      (data) => this.checkLogin(data));
  }

  checkLogin(data) {
    this.user = data;
    this.userLogged = !!data;
    return true;
  }
}
