import { Router } from '@angular/router';
import { ISit } from '../../defines/ISit';
import { IUser } from '../../defines/IUser';
import { MdDialog } from '@angular/material';
import { Component, Input} from '@angular/core';
import { SitService } from '../../services/sit.service';
import { AccountUserService } from '../../services/auth.service';
import { SitDialogComponent } from '../sit-dialog/sit-dialog.component';
import { UserLoginPageComponent } from '../login-page/login-page.component';
import { DateTimePickerComponent } from '../date-time-picker/date-time-picker.component';


@Component({
  selector: 'app-sit',
  templateUrl: './sit.component.html',
  styleUrls: ['./sit.component.scss']
})

export class SitComponent {
  @Input()
  sit: ISit;

  loggedInUser: IUser | boolean = false;

  constructor(private dialog: MdDialog,
              public router: Router,
              private sitService: SitService,
              private accountUserService: AccountUserService) {
    this.accountUserService.getLoggedUser()
      .subscribe((user) => this.loggedInUser = user);
  }

  private reserve() {
    const dialogRef = this.dialog.open(DateTimePickerComponent);
    dialogRef.afterClosed().subscribe((reserveDate: string) => {
      if (!reserveDate) {
        return;
      }
      this.sitService.reserveSit(this.sit.sitID, reserveDate)
        .subscribe(() => this.sit.reserved = !this.sit.reserved);
    });
  }

  reserveSit() {
    if (this.loggedInUser) {
      this.reserve();
    } else {
      const ref = this.dialog.open(UserLoginPageComponent);
      ref.afterClosed().subscribe(() =>
        this.router.navigate(['/']) && this.loggedInUser && this.reserve()
      );
    }
  }

  sitDetails() {
    this.dialog.open(SitDialogComponent, {
      data: this.sit
    });
  }
}
