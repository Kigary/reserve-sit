import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MdInputModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdButtonModule} from '@angular/material';
import {MdSelectModule} from '@angular/material';
@NgModule({
  imports: [
    FlexLayoutModule,
    MdInputModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule,
  ],
  exports: [
    FlexLayoutModule,
    MdInputModule,
    MdToolbarModule,
    MdButtonModule,
    MdSelectModule
  ],
})
export class OrgMaterialModule {
}
