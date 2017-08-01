import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdInputModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';


@NgModule({
  imports: [
    FlexLayoutModule,
    MdInputModule,
    MdToolbarModule,
    MdButtonModule
  ],
  exports: [
    FlexLayoutModule,
    MdInputModule,
    MdToolbarModule,
    MdButtonModule
  ],
})
export class OrgMaterialModule {
}
