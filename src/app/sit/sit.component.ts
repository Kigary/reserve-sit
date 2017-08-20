import { Component, Input, OnInit } from '@angular/core';
import {ISit} from '../defines/ISit';
import { IUser} from '../defines/IUser';
import {MdDialog} from '@angular/material';
import {SitService} from '../services/sit.service';
import {AccountUserService} from '../services/auth.service';
import {SitDialogComponent} from '../sit-dialog/sit-dialog.component';
import {ConfirmDialogComponent, IConfirmDialogOptions} from '../common/confirm-dialog/confirm-dialog.component';
import {Router} from '@angular/router';
import { UserLoginPageComponent } from '../components/login-page/login-page.component';

@Component({
  selector: 'app-sit',
  templateUrl: './sit.component.html',
  styleUrls: ['./sit.component.scss']
})
export class SitComponent implements OnInit {

  @Input()
  sit: ISit;
  loggedInUser: IUser | boolean = false;
  constructor(private dialog: MdDialog,
              public router: Router,
              private sitService: SitService,
              private accountUserService: AccountUserService) {
    this.accountUserService.getLoggedUser().subscribe((user) => this.loggedInUser = user);
  }

  private reserve() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Reserve Seat',
        msg: 'Really bro?',
        confirm: 'Reserve',
        reject: 'Cancel'
      } as IConfirmDialogOptions
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.sitService.reserveSit(this.sit.sitID).subscribe(() => this.sit.reserved = true);
    });
  }

  reserveSit() {
    if(this.loggedInUser) {
      this.reserve();
    } else {
      const ref = this.dialog.open(UserLoginPageComponent);
      ref.afterClosed().subscribe(() => this.router.navigate(['/']) && this.loggedInUser && this.reserve());
    }
  }

  sitDetails() {
    const dialogRef = this.dialog.open(SitDialogComponent, {
      data: this.sit
    });
  }

  ngOnInit() {
  }

}
