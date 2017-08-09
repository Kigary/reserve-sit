import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdButtonModule } from '@angular/material';
import {MdToolbarModule, MdMenuModule, MdDialogModule, MdInputModule, MdRadioModule,MdProgressSpinnerModule } from '@angular/material';
@NgModule({
  imports: [
    FlexLayoutModule,
    MdButtonModule,
    MdToolbarModule,
    MdMenuModule,
    MdDialogModule,
    MdInputModule,
    MdRadioModule,
    MdProgressSpinnerModule
  ],
  exports: [
    FlexLayoutModule,
    MdButtonModule,
    MdToolbarModule,
    MdMenuModule,
    MdDialogModule,
    MdInputModule,
    MdRadioModule,
    MdProgressSpinnerModule
  ],
})
export class HomeMaterialModule {
}


