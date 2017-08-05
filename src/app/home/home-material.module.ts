import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    FlexLayoutModule,
    MdButtonModule,
  ],
  exports: [
    FlexLayoutModule,
    MdButtonModule,
  ],
})
export class HomeMaterialModule {
}


