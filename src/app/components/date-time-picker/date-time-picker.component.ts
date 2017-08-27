import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';


@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
})
export class DateTimePickerComponent {
  minDate: Date;
  time: string;
  date: Date;

  constructor(private dialog: MdDialogRef<string>) {
    this.minDate = this.date = new Date();
    this.time = `${this.date}`.match(/\d\d:\d\d/)[0];
  }

  reserve() {
    const reserveDate = this.date.toDateString() + ' ' + this.time;
    this.dialog.close(reserveDate);
  }
}
