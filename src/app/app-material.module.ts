import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdCardModule,
  MdIconModule,
  MdListModule,
  MdMenuModule,
  MdChipsModule,
  MdInputModule,
  MdRadioModule,
  MdButtonModule,
  MdDialogModule,
  MdSelectModule,
  MdToolbarModule,
  MdCheckboxModule,
  MdGridListModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdProgressSpinnerModule
} from '@angular/material';


const materialModules = [
  MdCardModule,
  MdIconModule,
  MdListModule,
  MdMenuModule,
  MdChipsModule,
  MdInputModule,
  MdRadioModule,
  MdButtonModule,
  MdDialogModule,
  MdSelectModule,
  MdToolbarModule,
  MdCheckboxModule,
  MdGridListModule,
  MdDatepickerModule,
  MdNativeDateModule,
  MdProgressSpinnerModule,
  FlexLayoutModule,
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})

export class AppMaterialModule { }
