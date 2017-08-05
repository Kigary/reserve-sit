import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {AppCommonMaterialModule} from './common-material.module';

@NgModule({
  imports: [
    CommonModule,
    AppCommonMaterialModule
  ],
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class AppCommonModule { }
