import { NgModule } from '@angular/core';
import { MdButtonModule, MdDialogModule } from '@angular/material';


@NgModule({
  imports: [
    MdButtonModule,
    MdDialogModule
  ],
  exports: [
    MdButtonModule,
    MdDialogModule
  ]
})

export class AppCommonMaterialModule { }
