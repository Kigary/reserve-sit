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
  MdCardModule,
  MdSelectModule,
  MdProgressBarModule,
  MdChipsModule
} from '@angular/material';

const materialModules = [
  FlexLayoutModule,
  MdButtonModule,
  MdToolbarModule,
  MdMenuModule,
  MdDialogModule,
  MdInputModule,
  MdRadioModule,
  MdProgressSpinnerModule,
  MdGridListModule,
  MdCheckboxModule,
  MdProgressSpinnerModule,
  MdListModule,
  MdIconModule,
  MdCardModule,
  MdSelectModule,
  MdProgressBarModule,
  MdChipsModule
];

@NgModule({
  imports: materialModules,
  exports: materialModules
})

export class AppMaterialModule { }
