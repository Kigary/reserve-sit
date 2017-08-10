import { Component, OnInit } from '@angular/core';
import { IUser } from '../defines/IUser';
import { AccountUserService } from '../services/auth.service';

import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  user: IUser;

  constructor(private userService: UserService,
              private accountUserService: AccountUserService,
              ) {
  }

  signOut() {
    this.accountUserService.logOut().subscribe(
      () => {
        sessionStorage.removeItem('userLogin');
        location.reload();
      }
    );
  }

  ngOnInit() {
    this.userService.getLoggedUser().subscribe((user) => {
      this.user = user;
    });
  }
}
