import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdButtonModule,
  MdToolbarModule,
  MdMenuModule,
  MdDialogModule,
  MdInputModule,
  MdRadioModule,
  MdProgressSpinnerModule,
  MdGridListModule,
  MdCheckboxModule,
  MdListModule,
  MdIconModule,
  MdCardModule
} from '@angular/material';

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
    MdProgressSpinnerModule,
    MdListModule,
    MdIconModule,
    MdCardModule
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
    MdProgressSpinnerModule,
    MdListModule,
    MdIconModule,
    MdCardModule
  ],
})

export class AppMaterialModule { }
