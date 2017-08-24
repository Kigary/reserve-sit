import {Component, Inject, OnInit} from '@angular/core';
import {ISit} from '../../defines/ISit';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {SitService} from '../services/sit/sit.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'org-sit-dialog',
  templateUrl: './sit-dialog.component.html',
  styleUrls: ['./sit-dialog.component.scss']
})
export class SitDialogComponent implements OnInit {
  sit: ISit;
  inProgress = false;
  title: string;
  editMode: boolean;
  sitForm: FormGroup;
  fileSizeError = '';

  constructor(
    @Inject(MD_DIALOG_DATA) data: ISit,
    private dialogRef: MdDialogRef<ISit>,
    private sitService: SitService,
    private fb: FormBuilder) {
      this.sit = data;
      this.editMode = !!this.sit.sitID;
      this.title = (this.editMode ? 'Edit' : 'Add') + ' Sit';
  }

  saveSit() {
    Object.assign(this.sit, this.sitForm.value);
    const obs = this.sit.sitID ? this.sitService.updateSit(this.sit) :
      this.sitService.createSit(this.sit);
    obs.subscribe(sit => {
        this.fileSizeError = '';
        this.inProgress = true;
        setTimeout(()=>{return this.dialogRef.close(sit)}, 500);
      },(error) => {
          this.inProgress = false;
          this.fileSizeError = 'Image size must be less than 300 KB';
    })
  };

  formBuild() {
    this.sitForm = this.fb.group({
      name: [this.sit.name, [Validators.required, Validators.maxLength(12)]],
      numOfSeats: [this.sit.numOfSeats, [Validators.required, Validators.min(0), Validators.max(1000)]],
      cost: [this.sit.cost, [Validators.required, Validators.min(0), Validators.max(1000000)]],
      paid: [{value: this.sit.paid, disabled: !this.editMode || !this.sit.reserved}],
      image: [this.sit.image, [Validators, Validators.required]]
    });
  }

  ngOnInit() {
    this.formBuild();
  }
}
