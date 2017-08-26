import { Router } from '@angular/router';
import { IUser } from '../../defines/IUser';
import { Component, Input } from '@angular/core';
import { AccountUserService } from '../../services/auth.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent {
  @Input()
  user: IUser;

  constructor(private accountUserService: AccountUserService,
              private router: Router) {
  }

  signOut() {
    this.accountUserService.logOut().subscribe(() => this.router.navigate(['/']) );
  }
}
