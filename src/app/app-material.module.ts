import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdButtonModule } from '@angular/material';
import {
  MdToolbarModule,
  MdMenuModule,
  MdDialogModule,
  MdInputModule,
  MdRadioModule,
  MdProgressSpinnerModule,
  MdGridListModule,
  MdCheckboxModule } from '@angular/material';

@NgModule({
  imports: [
    FlexLayoutModule,
    MdButtonModule,
    MdToolbarModule,
    MdMenuModule,
    MdDialogModule,
    MdInputModule,
    MdRadioModule,
    MdProgressSpinnerModule,
    MdGridListModule,
    MdCheckboxModule
  ],
  exports: [
    FlexLayoutModule,
    MdButtonModule,
    MdToolbarModule,
    MdMenuModule,
    MdDialogModule,
    MdInputModule,
    MdRadioModule,
    MdProgressSpinnerModule,
    MdGridListModule,
    MdCheckboxModule
  ],
})

export class AppMaterialModule { }
