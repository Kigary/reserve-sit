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
    console.log(this.sitForm.value);
    Object.assign(this.sit, this.sitForm.value);
    const obs = this.sit.sitID ? this.sitService.updateSit(this.sit) :
      this.sitService.createSit(this.sit);
    this.inProgress = true;
    obs.subscribe(sit => this.dialogRef.close(sit));
  }

  formBuild() {
    this.sitForm = this.fb.group({
      sitName: [this.sit.sitName, [Validators.required, Validators.maxLength(12)]],
      numOfSeats: [this.sit.numOfSeats, [Validators.required, Validators.min(0), Validators.max(1000)]],
      cost: [this.sit.cost, [Validators.required, Validators.min(0), Validators.max(1000000)]],
      reserved: [{value: this.sit.reserved, disabled: !this.editMode}],
      paid: [{value: this.sit.paid, disabled: !this.editMode}],
      image: [this.sit.image, [Validators.required]]
    });
    this.sitForm.get('reserved').valueChanges.subscribe(val => {
      this.sitForm.get('paid')[val?'enable':'disable']();
      if(!val){
        this.sitForm.get('paid').setValue(false);
      }
    });
  }

  ngOnInit() {
    this.formBuild();
  }
}
