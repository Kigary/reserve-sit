import { Component, OnInit } from '@angular/core';
import { MdDialogRef} from '@angular/material';
@Component({
  selector: 'app-datatimepicker',
  templateUrl: './datatimepicker.component.html',
  styleUrls: ['./datatimepicker.component.scss'],
  providers: []
})
export class DatatimepickerComponent implements OnInit {
   time: string;
   value: Date;
  constructor(private dialog: MdDialogRef<Date>) {
    this.value = new Date();
    this.time = this.value.getHours() + ':' + this.value.getMinutes();
  }
  ngOnInit() {
  }
  close() {
    this.dialog.close(this.value);
  }
}
