import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdButtonModule } from '@angular/material';
import {MdToolbarModule, MdMenuModule} from '@angular/material';
@NgModule({
  imports: [
    FlexLayoutModule,
    MdButtonModule,
    MdToolbarModule,
    MdMenuModule
  ],
  exports: [
    FlexLayoutModule,
    MdButtonModule,
    MdToolbarModule,
    MdMenuModule
  ],
})
export class HomeMaterialModule {
}


