import {NgModule} from '@angular/core';
import {MdToolbarModule, MdInputModule, MdButtonModule} from '@angular/material';

@NgModule({
  imports: [
    MdToolbarModule,
    MdInputModule,
    MdButtonModule
      ],
  exports: [
    MdToolbarModule,
    MdInputModule,
    MdButtonModule
   ]})
export class AppMaterialModule {
}
