import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/auth/account.service';
import { IOrg } from '../../defines/IOrg';
import { OrgService } from '../services/org/org.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loggedOrg: IOrg;

  constructor(
      private accountService: AccountService,
      private orgService: OrgService) {
    this.orgService.getLoggedOrg().subscribe(org => this.loggedOrg = org);
  }

  ngOnInit() {
  }

  orgLogOut() {
    this.accountService.logOut().subscribe( () => {
      location.reload();
    });
  }
}
