import {Component, Input, OnInit} from '@angular/core';
import { IUser } from '../../defines/IUser';
import { AccountUserService } from '../../services/auth.service';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  @Input()
  user: IUser;

  constructor(private accountUserService: AccountUserService
              ) {
  }

  signOut() {
    this.accountUserService.logOut();
  }
  ngOnInit() { }
}
