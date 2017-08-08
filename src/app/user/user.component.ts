import {Component, OnInit} from '@angular/core';
import {IUser} from '../defines/IUser';
import {AccountUserService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
  user: IUser;
  constructor(private userService: UserService,
              private accountUserService: AccountUserService,
              private router: Router
  ) {  }

  ngOnInit() {
    this.userService.getLoggedUser().subscribe((user) => {
      this.user = user;
    });
  }
  signOut() {
      this.accountUserService.logOut().subscribe(() => {
        sessionStorage.removeItem('userLogin');
              location.reload();
        }
      );
  }
}
