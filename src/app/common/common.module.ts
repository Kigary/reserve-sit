import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCommonMaterialModule } from './common-material.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    AppCommonMaterialModule
  ],
  declarations: [
    ConfirmDialogComponent,
    NotFoundComponent
  ],
  exports: [
    ConfirmDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class AppCommonModule {
}
