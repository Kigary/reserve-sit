import {NgModule} from '@angular/core';
import {MdToolbarModule, MdInputModule, MdButtonModule, MdRadioModule} from '@angular/material';

@NgModule({
  imports: [
    MdToolbarModule,
    MdInputModule,
    MdButtonModule,
    MdRadioModule
  ],
  exports: [
    MdToolbarModule,
    MdInputModule,
    MdButtonModule,
    MdRadioModule
  ]})
export class AppMaterialModule {
}
