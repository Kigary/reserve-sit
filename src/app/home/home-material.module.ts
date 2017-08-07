import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdButtonModule } from '@angular/material';
import {MdToolbarModule} from '@angular/material';
@NgModule({
  imports: [
    FlexLayoutModule,
    MdButtonModule,
    MdToolbarModule,
  ],
  exports: [
    FlexLayoutModule,
    MdButtonModule,
    MdToolbarModule,
  ],
})
export class HomeMaterialModule {
}


