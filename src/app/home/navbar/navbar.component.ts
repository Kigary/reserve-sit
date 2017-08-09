import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { UserLoginPageComponent } from '../../login-page/login-page.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isUserLogged = sessionStorage.userLogin;

  constructor(public dialog: MdDialog) { }

  openLoginDialog() {
    const ref = this.dialog.open(UserLoginPageComponent);
    ref.afterClosed().subscribe((result) => this.isUserLogged = sessionStorage.userLogin);
  }

  ngOnInit() { }
}
