import { Component } from '@angular/core';
import { AccountService } from '../services/auth/account.service';
import { IOrg } from '../../defines/IOrg';
import { OrgService } from '../services/org/org.service';

@Component({
  selector: 'org-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loggedOrg: IOrg;

  constructor(private accountService: AccountService,
              private orgService: OrgService) {
    this.orgService.getLoggedOrg().subscribe(
      org => this.loggedOrg = org
    );
  }

  orgLogOut() {
    this.accountService.logOut().subscribe(
      () => location.reload()
    );
  }
}
